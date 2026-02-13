"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseTimerOptions {
  initialTime: number;
  onTimeUp?: () => void;
  autoStart?: boolean;
}

export function useTimer({ initialTime, onTimeUp, autoStart = false }: UseTimerOptions) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const onTimeUpRef = useRef(onTimeUp);

  onTimeUpRef.current = onTimeUp;

  const start = useCallback(() => {
    startTimeRef.current = Date.now();
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback((newTime?: number) => {
    stop();
    setTimeLeft(newTime ?? initialTime);
  }, [initialTime, stop]);

  const getElapsedSeconds = useCallback(() => {
    if (startTimeRef.current === 0) return 0;
    return Math.round((Date.now() - startTimeRef.current) / 1000);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          onTimeUpRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  return { timeLeft, isRunning, start, stop, reset, getElapsedSeconds };
}
