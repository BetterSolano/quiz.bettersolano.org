"use client";

import { motion } from "framer-motion";
import { Landmark, Music, MapPin, BookOpen, Clock, ArrowRight } from "lucide-react";
import { QuizCategory } from "@/types";
import { CategoryProgress } from "@/types/storage";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import { cardHover } from "@/styles/animations";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Landmark,
  Music,
  MapPin,
  BookOpen,
};

const colorMap: Record<string, { bg: string; text: string; border: string; shadow: string }> = {
  amber: { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/20", shadow: "shadow-amber-500/10" },
  violet: { bg: "bg-violet-500/10", text: "text-violet-600 dark:text-violet-400", border: "border-violet-500/20", shadow: "shadow-violet-500/10" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/20", shadow: "shadow-emerald-500/10" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/20", shadow: "shadow-blue-500/10" },
};

interface CategoryCardProps {
  category: QuizCategory;
  progress?: CategoryProgress;
  onClick: () => void;
}

export default function CategoryCard({ category, progress, onClick }: CategoryCardProps) {
  const Icon = iconMap[category.iconName] || BookOpen;
  const colors = colorMap[category.color] || colorMap.blue;

  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      <Card
        className={cn(
          "p-6 cursor-pointer group hover:border-border transition-all duration-300",
          "hover:shadow-lg",
          colors.shadow
        )}
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-4">
          <div className={cn("p-3 rounded-xl", colors.bg)}>
            <Icon className={cn("w-6 h-6", colors.text)} />
          </div>
          {progress && progress.timesPlayed > 0 && (
            <Badge variant="success" size="sm">
              Best: {progress.bestPercentage}%
            </Badge>
          )}
        </div>

        <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{category.description}</p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {category.questionCount} questions
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            ~{category.estimatedMinutes} min
          </span>
        </div>

        {progress && progress.timesPlayed > 0 && (
          <div className="mb-4">
            <ProgressBar
              value={progress.correctAnswers}
              max={progress.questionsAnswered}
              variant="success"
              size="sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {progress.timesPlayed} {progress.timesPlayed === 1 ? "attempt" : "attempts"}
            </p>
          </div>
        )}

        <div className={cn(
          "flex items-center gap-1.5 text-sm font-medium transition-colors",
          colors.text
        )}>
          <span>Start Quiz</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Card>
    </motion.div>
  );
}
