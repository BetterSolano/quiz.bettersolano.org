"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuizEngine } from "@/hooks/useQuizEngine";
import { useTimer } from "@/hooks/useTimer";
import { Question, CategoryId } from "@/types";
import QuizProgress from "./QuizProgress";
import QuizTimer from "./QuizTimer";
import StreakIndicator from "./StreakIndicator";
import ScorePopup from "./ScorePopup";
import AnswerFeedback from "./AnswerFeedback";
import DifficultyBadge from "./DifficultyBadge";
import MultipleChoice from "./question-types/MultipleChoice";
import TrueFalse from "./question-types/TrueFalse";
import FillInBlank from "./question-types/FillInBlank";
import ImageBased from "./question-types/ImageBased";
import { questionSlide } from "@/styles/animations";
import { Star } from "lucide-react";

interface QuizEngineProps {
  categoryId: CategoryId;
  questions: Question[];
  onComplete: (sessionId: string) => void;
}

export default function QuizEngine({ categoryId, questions, onComplete }: QuizEngineProps) {
  const engine = useQuizEngine({ categoryId, questions });
  const timer = useTimer({
    initialTime: engine.currentQuestion?.timeLimit || 20,
    onTimeUp: engine.handleTimeUp,
  });

  // Start timer only during the "question" state; stop for any other state.
  useEffect(() => {
    if (engine.state === "question") {
      timer.reset(engine.currentQuestion?.timeLimit || 20);
      timer.start();
    } else {
      timer.stop();
    }
  }, [engine.state, engine.currentIndex]);

  // Handle quiz completion
  useEffect(() => {
    if (engine.state === "completed" && engine.result) {
      onComplete(engine.result.sessionId);
    }
  }, [engine.state, engine.result, onComplete]);

  // Ready state — start screen
  if (engine.state === "ready") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-muted-foreground text-lg">Get ready!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={engine.startQuiz}
            className="px-12 py-4 bg-primary text-primary-foreground rounded-2xl text-xl font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
          >
            Start Quiz
          </motion.button>
          <p className="text-sm text-muted-foreground">
            {engine.totalQuestions} questions &middot; Answer before time runs out
          </p>
        </motion.div>
      </div>
    );
  }

  // Derive UI booleans from the authoritative state machine.
  // "answered" = options locked, pulse/shake playing, waiting for feedback panel
  // "feedback" = explanation panel visible, Continue button active
  // "transitioning" = Continue was clicked, card is exiting (no interaction allowed)
  const isOptionLocked = engine.state === "answered" || engine.state === "feedback" || engine.state === "transitioning";
  const showFeedbackPanel = engine.state === "feedback";
  const showScorePopup = isOptionLocked && (engine.currentScore?.totalPoints || 0) > 0;

  // currentAnswer is keyed by question ID — structurally correct regardless of array order.
  const currentAnswer = engine.currentAnswer;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Quiz header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <DifficultyBadge difficulty={engine.currentQuestion.difficulty} />
          <StreakIndicator streak={engine.streak.current} isActive={engine.streak.isActive} />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
            <Star className="w-4 h-4 text-primary" />
            <span className="tabular-nums">{engine.totalScore}</span>
          </div>
          {engine.state === "question" && (
            <QuizTimer timeLeft={timer.timeLeft} totalTime={engine.currentQuestion.timeLimit} />
          )}
        </div>
      </div>

      {/* Progress */}
      <QuizProgress current={engine.currentIndex} total={engine.totalQuestions} />

      {/* Question card */}
      <div className="relative">
        <ScorePopup
          points={engine.currentScore?.totalPoints || 0}
          show={showScorePopup}
        />

        <AnimatePresence mode="wait" custom={engine.direction}>
          <motion.div
            key={engine.currentQuestion.id}
            custom={engine.direction}
            variants={questionSlide}
            initial="enter"
            animate="center"
            exit="exit"
            className="bg-card border border-border/50 rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            {/* Question text */}
            <h2 className="text-lg sm:text-xl font-semibold mb-6 leading-relaxed">
              {engine.currentQuestion.question}
            </h2>

            {/* Question type renderer — uses ID-keyed currentAnswer as single source of truth */}
            {engine.currentQuestion.type === "multiple-choice" && (
              <MultipleChoice
                options={engine.currentQuestion.options}
                correctIndex={engine.currentQuestion.correctIndex}
                onSelect={(index) => engine.submitAnswer(index)}
                isAnswered={isOptionLocked}
                selectedIndex={currentAnswer?.selectedAnswer as number | undefined}
              />
            )}

            {engine.currentQuestion.type === "true-false" && (
              <TrueFalse
                correctAnswer={engine.currentQuestion.correctAnswer}
                onSelect={(answer) => engine.submitAnswer(answer)}
                isAnswered={isOptionLocked}
                selectedAnswer={currentAnswer?.selectedAnswer as boolean | undefined}
              />
            )}

            {engine.currentQuestion.type === "fill-in-blank" && (
              <FillInBlank
                blankedSentence={engine.currentQuestion.blankedSentence}
                acceptedAnswers={engine.currentQuestion.acceptedAnswers}
                hint={engine.currentQuestion.hint}
                onSubmit={(answer) => engine.submitAnswer(answer)}
                isAnswered={isOptionLocked}
                submittedAnswer={currentAnswer?.selectedAnswer as string | undefined}
              />
            )}

            {engine.currentQuestion.type === "image-based" && (
              <ImageBased
                imageSrc={engine.currentQuestion.imageSrc}
                imageAlt={engine.currentQuestion.imageAlt}
                options={engine.currentQuestion.options}
                correctIndex={engine.currentQuestion.correctIndex}
                onSelect={(index) => engine.submitAnswer(index)}
                isAnswered={isOptionLocked}
                selectedIndex={currentAnswer?.selectedAnswer as number | undefined}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Feedback panel — only visible in "feedback" state */}
        <AnimatePresence>
          {showFeedbackPanel && currentAnswer && (
            <div className="mt-4">
              <AnswerFeedback
                isCorrect={currentAnswer.isCorrect}
                explanation={engine.currentQuestion.explanation}
                pointsEarned={currentAnswer.pointsEarned}
                streakCount={engine.streak.current}
                onContinue={engine.nextQuestion}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
