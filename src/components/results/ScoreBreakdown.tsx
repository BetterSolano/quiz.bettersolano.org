"use client";

import { motion } from "framer-motion";
import { Star, Flame, Zap, TrendingUp } from "lucide-react";
import { QuizResult } from "@/types/scoring";
import { staggerContainer, staggerItem } from "@/styles/animations";

export default function ScoreBreakdown({ result }: { result: QuizResult }) {
  const items = [
    {
      icon: Star,
      label: "Base Points",
      value: result.pointsBreakdown.basePoints,
      color: "text-blue-500",
    },
    {
      icon: Zap,
      label: "Time Bonus",
      value: result.pointsBreakdown.totalTimeBonus,
      color: "text-emerald-500",
    },
    {
      icon: Flame,
      label: "Streak Bonus",
      value: result.pointsBreakdown.totalStreakBonus,
      color: "text-amber-500",
    },
    {
      icon: TrendingUp,
      label: "Difficulty Bonus",
      value: result.pointsBreakdown.totalDifficultyBonus,
      color: "text-violet-500",
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="bg-card border border-border/50 rounded-xl p-6"
    >
      <h3 className="font-semibold mb-4">Score Breakdown</h3>
      <div className="space-y-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              variants={staggerItem}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2 text-sm">
                <Icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-muted-foreground">{item.label}</span>
              </div>
              <span className="font-semibold tabular-nums">+{item.value}</span>
            </motion.div>
          );
        })}
        <div className="border-t border-border pt-3 flex items-center justify-between">
          <span className="font-semibold">Total</span>
          <span className="text-lg font-bold text-primary">{result.totalScore}</span>
        </div>
      </div>
    </motion.div>
  );
}
