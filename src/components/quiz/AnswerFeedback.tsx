"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, ChevronRight, BookOpen } from "lucide-react";
import Button from "@/components/ui/Button";
import { feedbackSlideUp } from "@/styles/animations";
import { cn } from "@/lib/utils";

interface AnswerFeedbackProps {
  isCorrect: boolean;
  explanation: string;
  pointsEarned: number;
  streakCount: number;
  onContinue: () => void;
}

export default function AnswerFeedback({
  isCorrect,
  explanation,
  pointsEarned,
  streakCount,
  onContinue,
}: AnswerFeedbackProps) {
  return (
    <motion.div
      variants={feedbackSlideUp}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        "rounded-xl border-2 p-6 space-y-4",
        isCorrect
          ? "bg-success/5 border-success/30"
          : "bg-error/5 border-error/30"
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        {isCorrect ? (
          <div className="flex items-center gap-2 text-success">
            <CheckCircle className="w-6 h-6" />
            <span className="text-lg font-bold">Correct!</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-error">
            <XCircle className="w-6 h-6" />
            <span className="text-lg font-bold">Incorrect</span>
          </div>
        )}
        {isCorrect && pointsEarned > 0 && (
          <span className="ml-auto text-sm font-semibold text-primary">
            +{pointsEarned} pts
            {streakCount > 1 && (
              <span className="text-amber-500 ml-1">({streakCount}x streak)</span>
            )}
          </span>
        )}
      </div>

      {/* Explanation */}
      <div className="flex items-start gap-2 text-sm text-muted-foreground">
        <BookOpen className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">{explanation}</p>
      </div>

      {/* Continue button */}
      <Button
        onClick={onContinue}
        variant={isCorrect ? "success" : "primary"}
        className="w-full"
      >
        Continue
        <ChevronRight className="w-4 h-4" />
      </Button>
    </motion.div>
  );
}
