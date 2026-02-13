"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { timerPulse } from "@/styles/animations";
import { cn } from "@/lib/utils";

interface QuizTimerProps {
  timeLeft: number;
  totalTime: number;
}

export default function QuizTimer({ timeLeft, totalTime }: QuizTimerProps) {
  const isWarning = timeLeft <= 5;
  const percentage = (timeLeft / totalTime) * 100;

  return (
    <motion.div
      variants={timerPulse}
      animate={isWarning ? "warning" : "normal"}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors",
        isWarning ? "bg-error/10 text-error" : "bg-muted text-muted-foreground"
      )}
      aria-live="polite"
      aria-label={`${timeLeft} seconds remaining`}
    >
      <Clock className="w-4 h-4" />
      <span className="tabular-nums min-w-[28px] text-center">{timeLeft}s</span>
      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          className={cn(
            "h-full rounded-full transition-colors",
            isWarning ? "bg-error" : "bg-primary"
          )}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}
