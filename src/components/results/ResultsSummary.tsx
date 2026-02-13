"use client";

import { motion } from "framer-motion";
import { Crown, Award, Medal, RefreshCw, Target, Zap, Flame, TrendingUp } from "lucide-react";
import { QuizResult, Grade } from "@/types/scoring";
import CircularProgress from "@/components/ui/CircularProgress";
import CountUpNumber from "@/components/ui/CountUpNumber";
import { resultsFanfare, staggerContainer, staggerItem } from "@/styles/animations";
import { GRADE_THRESHOLDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const gradeConfig: Record<Grade, { icon: React.ComponentType<{ className?: string }>; color: string; bgColor: string }> = {
  S: { icon: Crown, color: "text-amber-500", bgColor: "bg-amber-500/10" },
  A: { icon: Award, color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
  B: { icon: Medal, color: "text-blue-500", bgColor: "bg-blue-500/10" },
  C: { icon: Medal, color: "text-violet-500", bgColor: "bg-violet-500/10" },
  D: { icon: RefreshCw, color: "text-orange-500", bgColor: "bg-orange-500/10" },
  F: { icon: RefreshCw, color: "text-error", bgColor: "bg-error/10" },
};

const progressVariant = (grade: Grade) => {
  if (grade === "S" || grade === "A") return "success" as const;
  if (grade === "B" || grade === "C") return "primary" as const;
  return "error" as const;
};

export default function ResultsSummary({ result }: { result: QuizResult }) {
  const { icon: GradeIcon, color, bgColor } = gradeConfig[result.grade];
  const gradeInfo = GRADE_THRESHOLDS.find((g) => g.grade === result.grade);

  const stats = [
    { icon: Target, label: "Accuracy", value: result.percentage, suffix: "%" },
    { icon: Zap, label: "Avg Time", value: result.averageTimePerQuestion, suffix: "s" },
    { icon: Flame, label: "Best Streak", value: result.longestStreak, suffix: "" },
    { icon: TrendingUp, label: "Total Score", value: result.totalScore, suffix: "" },
  ];

  return (
    <motion.div
      variants={resultsFanfare}
      initial="hidden"
      animate="visible"
      className="text-center space-y-8"
    >
      {/* Grade display */}
      <div className="space-y-4">
        <CircularProgress
          percentage={result.percentage}
          size={160}
          strokeWidth={10}
          variant={progressVariant(result.grade)}
          className="mx-auto"
        >
          <div className="flex flex-col items-center">
            <GradeIcon className={cn("w-8 h-8 mb-1", color)} />
            <span className={cn("text-3xl font-bold", color)}>{result.grade}</span>
          </div>
        </CircularProgress>

        <div>
          <h2 className="text-2xl font-bold">{gradeInfo?.label}</h2>
          <p className="text-muted-foreground mt-1">
            {result.correctCount} of {result.totalQuestions} correct
          </p>
        </div>
      </div>

      {/* Stats grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="bg-card border border-border/50 rounded-xl p-4 text-center"
            >
              <Icon className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
              <div className="text-xl font-bold">
                <CountUpNumber end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
