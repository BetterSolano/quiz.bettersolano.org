import { CategoryId, UserAnswer } from "./quiz";

export interface ScoreResult {
  basePoints: number;
  streakBonus: number;
  timeBonus: number;
  difficultyMultiplier: number;
  totalPoints: number;
}

export interface QuizResult {
  sessionId: string;
  categoryId: CategoryId;
  totalScore: number;
  maxPossibleScore: number;
  percentage: number;
  correctCount: number;
  totalQuestions: number;
  longestStreak: number;
  averageTimePerQuestion: number;
  totalTime: number;
  grade: Grade;
  completedAt: number;
  answers: UserAnswer[];
  pointsBreakdown: {
    basePoints: number;
    totalStreakBonus: number;
    totalTimeBonus: number;
    totalDifficultyBonus: number;
  };
}

export interface StreakState {
  current: number;
  longest: number;
  isActive: boolean;
}

export type Grade = "S" | "A" | "B" | "C" | "D" | "F";
