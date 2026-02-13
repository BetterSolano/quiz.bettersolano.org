"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Lightbulb, CheckCircle, XCircle } from "lucide-react";
import { optionItem } from "@/styles/animations";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { normalizeAnswer } from "@/lib/utils";

interface FillInBlankProps {
  blankedSentence: string;
  acceptedAnswers: string[];
  hint?: string;
  onSubmit: (answer: string) => void;
  isAnswered: boolean;
  submittedAnswer?: string;
}

export default function FillInBlank({
  blankedSentence,
  acceptedAnswers,
  hint,
  onSubmit,
  isAnswered,
  submittedAnswer,
}: FillInBlankProps) {
  const [input, setInput] = useState("");
  const [showHint, setShowHint] = useState(false);

  const isCorrect =
    isAnswered &&
    submittedAnswer !== undefined &&
    acceptedAnswers.some(
      (a) => normalizeAnswer(a) === normalizeAnswer(submittedAnswer)
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isAnswered) {
      onSubmit(input.trim());
    }
  };

  return (
    <motion.div variants={optionItem} initial="hidden" animate="visible" className="space-y-6">
      {/* Blanked sentence */}
      <div className="bg-muted/50 rounded-xl p-6 text-center">
        <p className="text-lg leading-relaxed">
          {blankedSentence.split("________").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span
                  className={cn(
                    "inline-block min-w-[120px] mx-1 px-3 py-1 rounded-lg border-2 border-dashed font-semibold",
                    !isAnswered && "border-primary/50 text-primary",
                    isCorrect && "border-success bg-success/10 text-success",
                    isAnswered && !isCorrect && "border-error bg-error/10 text-error"
                  )}
                >
                  {isAnswered ? submittedAnswer : input || "???"}
                </span>
              )}
            </span>
          ))}
        </p>
      </div>

      {/* Input form */}
      {!isAnswered && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer..."
              className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              autoFocus
              autoComplete="off"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={!input.trim()} className="flex-1">
              <Send className="w-4 h-4" />
              Submit Answer
            </Button>
            {hint && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowHint(true)}
                className="text-muted-foreground"
              >
                <Lightbulb className="w-4 h-4" />
                Hint
              </Button>
            )}
          </div>

          {showHint && hint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 p-3 rounded-lg bg-warning/10 text-sm"
            >
              <Lightbulb className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
              <span className="text-warning">{hint}</span>
            </motion.div>
          )}
        </form>
      )}

      {/* Result indicator — uses pulse/shake from optionItem's unified variant set */}
      {isAnswered && (
        <motion.div
          animate={isCorrect ? "pulse" : "shake"}
          variants={optionItem}
          className={cn(
            "flex items-center justify-center gap-2 p-4 rounded-xl font-semibold",
            isCorrect && "bg-success/10 text-success",
            !isCorrect && "bg-error/10 text-error"
          )}
        >
          {isCorrect ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Correct!</span>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5" />
              <span>
                The answer was: {acceptedAnswers[0]}
              </span>
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
