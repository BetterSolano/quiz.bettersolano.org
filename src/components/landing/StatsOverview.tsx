"use client";

import { motion } from "framer-motion";
import { BarChart3, Target, Flame, Star } from "lucide-react";
import { UserProgress } from "@/types/storage";
import CountUpNumber from "@/components/ui/CountUpNumber";
import { staggerContainer, staggerItem } from "@/styles/animations";

interface StatsOverviewProps {
  progress: UserProgress;
}

const stats: Array<{ key: keyof UserProgress; label: string; icon: typeof BarChart3; suffix?: string; color: string }> = [
  { key: "totalQuizzesTaken", label: "Quizzes Taken", icon: BarChart3, color: "text-blue-500" },
  { key: "overallAccuracy", label: "Accuracy", icon: Target, suffix: "%", color: "text-emerald-500" },
  { key: "longestStreak", label: "Best Streak", icon: Flame, color: "text-amber-500" },
  { key: "totalPointsEarned", label: "Total Points", icon: Star, color: "text-violet-500" },
];

export default function StatsOverview({ progress }: StatsOverviewProps) {
  if (progress.totalQuizzesTaken === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          const value = progress[stat.key] as number;
          return (
            <motion.div
              key={stat.key}
              variants={staggerItem}
              className="bg-card border border-border/50 rounded-xl p-5 text-center"
            >
              <Icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold">
                <CountUpNumber end={value} suffix={stat.suffix || ""} />
              </div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
