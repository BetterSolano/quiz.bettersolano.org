"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ChevronDown, BookOpen, Clock } from "lucide-react";
import { QuizResult } from "@/types/scoring";
import { Question } from "@/types";
import DifficultyBadge from "@/components/quiz/DifficultyBadge";
import { cn } from "@/lib/utils";

interface QuestionReviewProps {
  result: QuizResult;
  questions: Question[];
}

export default function QuestionReview({ result, questions }: QuestionReviewProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <h3 className="font-semibold mb-4">Review Answers</h3>
      {result.answers.map((answer, index) => {
        const question = questions.find((q) => q.id === answer.questionId);
        if (!question) return null;
        const isExpanded = expandedId === answer.questionId;

        return (
          <div
            key={answer.questionId}
            className="bg-card border border-border/50 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setExpandedId(isExpanded ? null : answer.questionId)}
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-accent/50 transition-colors"
            >
              <div
                className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                  answer.isCorrect ? "bg-success/10" : "bg-error/10"
                )}
              >
                {answer.isCorrect ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <X className="w-4 h-4 text-error" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  Q{index + 1}: {question.question}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                  {answer.pointsEarned} pts
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform",
                    isExpanded && "rotate-180"
                  )}
                />
              </div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-3 border-t border-border/50 pt-3">
                    <div className="flex items-center gap-2">
                      <DifficultyBadge difficulty={question.difficulty} />
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {answer.timeSpent}s
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <BookOpen className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <p>{question.explanation}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
