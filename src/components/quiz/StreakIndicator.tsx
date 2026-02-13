"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { streakFlame } from "@/styles/animations";
import { cn } from "@/lib/utils";

interface StreakIndicatorProps {
  streak: number;
  isActive: boolean;
}

export default function StreakIndicator({ streak, isActive }: StreakIndicatorProps) {
  if (streak === 0) return null;

  return (
    <motion.div
      variants={streakFlame}
      animate={isActive ? "active" : "idle"}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold",
        isActive ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : "bg-muted text-muted-foreground"
      )}
    >
      <Flame className={cn("w-4 h-4", isActive && "text-amber-500")} />
      <span className="tabular-nums">{streak}</span>
    </motion.div>
  );
}
