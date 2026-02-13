"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { optionContainer, optionItem, correctPulse, incorrectShake } from "@/styles/animations";
import { cn } from "@/lib/utils";

interface MultipleChoiceProps {
  options: string[];
  correctIndex: number;
  onSelect: (index: number) => void;
  isAnswered: boolean;
  selectedIndex?: number;
}

export default function MultipleChoice({
  options,
  correctIndex,
  onSelect,
  isAnswered,
  selectedIndex,
}: MultipleChoiceProps) {
  const labels = ["A", "B", "C", "D"];

  return (
    <motion.div
      variants={optionContainer}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {options.map((option, index) => {
        const isSelected = selectedIndex === index;
        const isCorrect = index === correctIndex;
        const showCorrect = isAnswered && isCorrect;
        const showIncorrect = isAnswered && isSelected && !isCorrect;

        return (
          <motion.button
            key={index}
            variants={optionItem}
            animate={
              showCorrect ? "pulse" : showIncorrect ? "shake" : undefined
            }
            {...(showCorrect ? correctPulse : showIncorrect ? incorrectShake : {})}
            onClick={() => !isAnswered && onSelect(index)}
            disabled={isAnswered}
            className={cn(
              "w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200",
              !isAnswered && "hover:border-primary/50 hover:bg-primary/5 cursor-pointer",
              !isAnswered && "border-border bg-card",
              isAnswered && !isSelected && !isCorrect && "border-border/50 bg-card/50 opacity-50",
              showCorrect && "border-success bg-success/10",
              showIncorrect && "border-error bg-error/10",
              isSelected && !isAnswered && "border-primary bg-primary/10"
            )}
          >
            <span
              className={cn(
                "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold transition-colors",
                !isAnswered && "bg-muted text-muted-foreground",
                showCorrect && "bg-success text-success-foreground",
                showIncorrect && "bg-error text-error-foreground",
                isSelected && !isAnswered && "bg-primary text-primary-foreground"
              )}
            >
              {labels[index]}
            </span>
            <span className="flex-1 text-sm font-medium">{option}</span>
            {showCorrect && <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />}
            {showIncorrect && <XCircle className="w-5 h-5 text-error flex-shrink-0" />}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
