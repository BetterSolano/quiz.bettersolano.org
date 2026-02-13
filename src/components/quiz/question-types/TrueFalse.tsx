"use client";

import { motion } from "framer-motion";
import { Check, X, CheckCircle, XCircle } from "lucide-react";
import { optionContainer, optionItem } from "@/styles/animations";
import { cn } from "@/lib/utils";

interface TrueFalseProps {
  correctAnswer: boolean;
  onSelect: (answer: boolean) => void;
  isAnswered: boolean;
  selectedAnswer?: boolean;
}

export default function TrueFalse({
  correctAnswer,
  onSelect,
  isAnswered,
  selectedAnswer,
}: TrueFalseProps) {
  const options = [
    { value: true, label: "True", icon: Check },
    { value: false, label: "False", icon: X },
  ];

  return (
    <motion.div
      variants={optionContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-4"
    >
      {options.map(({ value, label, icon: Icon }) => {
        const isSelected = selectedAnswer === value;
        const isCorrect = value === correctAnswer;
        const showCorrect = isAnswered && isCorrect;
        const showIncorrect = isAnswered && isSelected && !isCorrect;

        let animateTarget: string | undefined;
        if (showCorrect) animateTarget = "pulse";
        else if (showIncorrect) animateTarget = "shake";

        return (
          <motion.button
            key={String(value)}
            variants={optionItem}
            animate={animateTarget}
            onClick={() => !isAnswered && onSelect(value)}
            disabled={isAnswered}
            className={cn(
              "flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200",
              !isAnswered && "hover:border-primary/50 hover:bg-primary/5 cursor-pointer",
              !isAnswered && "border-border bg-card",
              isAnswered && !isSelected && !isCorrect && "border-border/50 bg-card/50 opacity-50",
              showCorrect && "border-success bg-success/10",
              showIncorrect && "border-error bg-error/10",
              isSelected && !isAnswered && "border-primary bg-primary/10"
            )}
          >
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                !isAnswered && "bg-muted",
                showCorrect && "bg-success/20",
                showIncorrect && "bg-error/20",
                isSelected && !isAnswered && "bg-primary/20"
              )}
            >
              <Icon
                className={cn(
                  "w-6 h-6",
                  !isAnswered && "text-muted-foreground",
                  showCorrect && "text-success",
                  showIncorrect && "text-error",
                  isSelected && !isAnswered && "text-primary"
                )}
              />
            </div>
            <span className="text-sm font-semibold">{label}</span>
            {showCorrect && <CheckCircle className="w-5 h-5 text-success" />}
            {showIncorrect && <XCircle className="w-5 h-5 text-error" />}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
