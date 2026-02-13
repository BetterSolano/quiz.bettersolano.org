"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  variant?: "primary" | "success" | "warning" | "error";
  size?: "sm" | "md";
  showLabel?: boolean;
  className?: string;
}

const variantBg: Record<string, string> = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};

export default function ProgressBar({
  value,
  max,
  variant = "primary",
  size = "sm",
  showLabel = false,
  className,
}: ProgressBarProps) {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between mb-1 text-xs text-muted-foreground">
          <span>{value} / {max}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full rounded-full bg-muted overflow-hidden",
          size === "sm" && "h-2",
          size === "md" && "h-3"
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <motion.div
          className={cn("h-full rounded-full", variantBg[variant])}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
