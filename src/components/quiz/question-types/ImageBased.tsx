"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { optionContainer, optionItem, correctPulse, incorrectShake } from "@/styles/animations";
import { cn } from "@/lib/utils";

interface ImageBasedProps {
  imageSrc: string;
  imageAlt: string;
  options: string[];
  correctIndex: number;
  onSelect: (index: number) => void;
  isAnswered: boolean;
  selectedIndex?: number;
}

export default function ImageBased({
  imageSrc,
  imageAlt,
  options,
  correctIndex,
  onSelect,
  isAnswered,
  selectedIndex,
}: ImageBasedProps) {
  const labels = ["A", "B", "C", "D"];

  return (
    <div className="space-y-6">
      {/* Image */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-muted border border-border">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <p className="text-sm">{imageAlt}</p>
        </div>
      </div>

      {/* Options */}
      <motion.div
        variants={optionContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
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
                "flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all duration-200",
                !isAnswered && "hover:border-primary/50 hover:bg-primary/5 cursor-pointer",
                !isAnswered && "border-border bg-card",
                isAnswered && !isSelected && !isCorrect && "border-border/50 bg-card/50 opacity-50",
                showCorrect && "border-success bg-success/10",
                showIncorrect && "border-error bg-error/10"
              )}
            >
              <span
                className={cn(
                  "flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-xs font-semibold",
                  !isAnswered && "bg-muted text-muted-foreground",
                  showCorrect && "bg-success text-success-foreground",
                  showIncorrect && "bg-error text-error-foreground"
                )}
              >
                {labels[index]}
              </span>
              <span className="flex-1 text-sm font-medium">{option}</span>
              {showCorrect && <CheckCircle className="w-4 h-4 text-success" />}
              {showIncorrect && <XCircle className="w-4 h-4 text-error" />}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
