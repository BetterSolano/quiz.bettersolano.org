"use client";

import { useState, useCallback, useRef } from "react";
import {
  Question,
  QuizState,
  UserAnswer,
  CategoryId,
} from "@/types";
import { ScoreResult, StreakState, QuizResult } from "@/types/scoring";
import {
  calculateQuestionScore,
  calculateGrade,
  updateStreak,
} from "@/lib/scoring";
import { shuffle } from "@/lib/shuffle";
import { generateSessionId, normalizeAnswer, getPercentage } from "@/lib/utils";
import { FEEDBACK_DISPLAY_MS } from "@/lib/constants";
import { updateProgressWithResult, setActiveSession } from "@/lib/storage";

interface UseQuizEngineProps {
  categoryId: CategoryId;
  questions: Question[];
}

interface QuizEngineState {
  state: QuizState;
  currentIndex: number;
  questions: Question[];
  answers: UserAnswer[];
  currentScore: ScoreResult | null;
  streak: StreakState;
  totalScore: number;
  direction: number;
  result: QuizResult | null;
}

export function useQuizEngine({ categoryId, questions: rawQuestions }: UseQuizEngineProps) {
  const sessionIdRef = useRef(generateSessionId());
  const startTimeRef = useRef(Date.now());
  const questionStartRef = useRef(Date.now());

  const [engine, setEngine] = useState<QuizEngineState>(() => {
    const shuffled = shuffle(rawQuestions);
    return {
      state: "ready",
      currentIndex: 0,
      questions: shuffled,
      answers: [],
      currentScore: null,
      streak: { current: 0, longest: 0, isActive: false },
      totalScore: 0,
      direction: 1,
      result: null,
    };
  });

  const startQuiz = useCallback(() => {
    startTimeRef.current = Date.now();
    questionStartRef.current = Date.now();
    setEngine((prev) => ({ ...prev, state: "question" }));
  }, []);

  const submitAnswer = useCallback(
    (answer: string | number | boolean) => {
      setEngine((prev) => {
        if (prev.state !== "question") return prev;

        const question = prev.questions[prev.currentIndex];
        const timeSpent = Math.round((Date.now() - questionStartRef.current) / 1000);

        let isCorrect = false;
        if (question.type === "multiple-choice" || question.type === "image-based") {
          isCorrect = answer === question.correctIndex;
        } else if (question.type === "true-false") {
          isCorrect = answer === question.correctAnswer;
        } else if (question.type === "fill-in-blank") {
          const normalized = normalizeAnswer(String(answer));
          isCorrect = question.acceptedAnswers.some(
            (accepted) => normalizeAnswer(accepted) === normalized
          );
        }

        const newStreak = updateStreak(prev.streak, isCorrect);
        const scoreResult = calculateQuestionScore(
          isCorrect,
          question.difficulty,
          timeSpent,
          question.timeLimit,
          newStreak.current
        );

        const userAnswer: UserAnswer = {
          questionId: question.id,
          selectedAnswer: answer,
          isCorrect,
          timeSpent,
          pointsEarned: scoreResult.totalPoints,
          streakAtTime: newStreak.current,
        };

        return {
          ...prev,
          state: "feedback",
          currentScore: scoreResult,
          streak: newStreak,
          totalScore: prev.totalScore + scoreResult.totalPoints,
          answers: [...prev.answers, userAnswer],
        };
      });
    },
    []
  );

  const handleTimeUp = useCallback(() => {
    submitAnswer(-1); // -1 signals timeout — always incorrect
  }, [submitAnswer]);

  const nextQuestion = useCallback(() => {
    setEngine((prev) => {
      const nextIndex = prev.currentIndex + 1;

      if (nextIndex >= prev.questions.length) {
        // Quiz complete — calculate results
        const totalTime = Math.round((Date.now() - startTimeRef.current) / 1000);
        const correctCount = prev.answers.filter((a) => a.isCorrect).length;
        const percentage = getPercentage(correctCount, prev.questions.length);

        const maxPossible = prev.questions.reduce((sum, q) => {
          const base = q.points;
          const maxTime = 50;
          const multiplier = q.difficulty === "hard" ? 2 : q.difficulty === "medium" ? 1.5 : 1;
          return sum + Math.round((base + maxTime) * multiplier);
        }, 0);

        const breakdown = prev.answers.reduce(
          (acc, _a, i) => {
            const q = prev.questions[i];
            const score = calculateQuestionScore(
              prev.answers[i].isCorrect,
              q.difficulty,
              prev.answers[i].timeSpent,
              q.timeLimit,
              prev.answers[i].streakAtTime
            );
            return {
              basePoints: acc.basePoints + score.basePoints,
              totalStreakBonus: acc.totalStreakBonus + score.streakBonus,
              totalTimeBonus: acc.totalTimeBonus + score.timeBonus,
              totalDifficultyBonus:
                acc.totalDifficultyBonus +
                (score.totalPoints - score.basePoints - score.streakBonus - score.timeBonus),
            };
          },
          { basePoints: 0, totalStreakBonus: 0, totalTimeBonus: 0, totalDifficultyBonus: 0 }
        );

        const result: QuizResult = {
          sessionId: sessionIdRef.current,
          categoryId,
          totalScore: prev.totalScore,
          maxPossibleScore: maxPossible,
          percentage,
          correctCount,
          totalQuestions: prev.questions.length,
          longestStreak: prev.streak.longest,
          averageTimePerQuestion: Math.round(totalTime / prev.questions.length),
          totalTime,
          grade: calculateGrade(percentage),
          completedAt: Date.now(),
          answers: prev.answers,
          pointsBreakdown: breakdown,
        };

        // Persist results
        updateProgressWithResult(result);
        setActiveSession(null);

        return {
          ...prev,
          state: "completed",
          result,
          direction: 1,
        };
      }

      questionStartRef.current = Date.now();
      return {
        ...prev,
        state: "question",
        currentIndex: nextIndex,
        currentScore: null,
        direction: 1,
      };
    });
  }, [categoryId]);

  const restartQuiz = useCallback(() => {
    sessionIdRef.current = generateSessionId();
    startTimeRef.current = Date.now();
    questionStartRef.current = Date.now();

    setEngine({
      state: "ready",
      currentIndex: 0,
      questions: shuffle(rawQuestions),
      answers: [],
      currentScore: null,
      streak: { current: 0, longest: 0, isActive: false },
      totalScore: 0,
      direction: 1,
      result: null,
    });
  }, [rawQuestions]);

  return {
    ...engine,
    currentQuestion: engine.questions[engine.currentIndex],
    totalQuestions: engine.questions.length,
    startQuiz,
    submitAnswer,
    handleTimeUp,
    nextQuestion,
    restartQuiz,
  };
}
