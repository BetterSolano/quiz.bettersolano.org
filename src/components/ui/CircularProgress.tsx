"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  variant?: "primary" | "success" | "warning" | "error";
  children?: React.ReactNode;
  className?: string;
}

const variantColors: Record<string, string> = {
  primary: "stroke-primary",
  success: "stroke-success",
  warning: "stroke-warning",
  error: "stroke-error",
};

export default function CircularProgress({
  percentage,
  size = 120,
  strokeWidth = 8,
  variant = "primary",
  children,
  className,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-muted"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className={variantColors[variant]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
