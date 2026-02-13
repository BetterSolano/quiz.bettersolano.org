"use client";

import { useEffect, useState, useRef } from "react";

interface CountUpNumberProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function CountUpNumber({
  end,
  duration = 1500,
  prefix = "",
  suffix = "",
  className,
}: CountUpNumberProps) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const startTime = performance.now();
    const startValue = 0;

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (end - startValue) * eased);

      setCount(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    }

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration]);

  return (
    <span className={className}>
      {prefix}
      {new Intl.NumberFormat().format(count)}
      {suffix}
    </span>
  );
}
