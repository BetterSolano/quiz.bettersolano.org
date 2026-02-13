import { Difficulty } from "@/types";
import { ScoreResult, StreakState, Grade } from "@/types/scoring";
import {
  BASE_POINTS,
  DIFFICULTY_MULTIPLIERS,
  TIME_BONUS_MAX,
  STREAK_BONUS_PER_LEVEL,
  MAX_STREAK_BONUS,
} from "./constants";

export function calculateTimeBonus(timeSpent: number, timeLimit: number): number {
  const timeRatio = timeSpent / timeLimit;
  if (timeRatio >= 1) return 0;
  if (timeRatio <= 0.25) return TIME_BONUS_MAX;
  return Math.round(TIME_BONUS_MAX * (1 - (timeRatio - 0.25) / 0.75));
}

export function calculateStreakBonus(streak: number): number {
  if (streak <= 1) return 0;
  return Math.min(streak * STREAK_BONUS_PER_LEVEL, MAX_STREAK_BONUS);
}

export function calculateQuestionScore(
  isCorrect: boolean,
  difficulty: Difficulty,
  timeSpent: number,
  timeLimit: number,
  currentStreak: number
): ScoreResult {
  if (!isCorrect) {
    return {
      basePoints: 0,
      streakBonus: 0,
      timeBonus: 0,
      difficultyMultiplier: 1,
      totalPoints: 0,
    };
  }

  const basePoints = BASE_POINTS[difficulty];
  const timeBonus = calculateTimeBonus(timeSpent, timeLimit);
  const streakBonus = calculateStreakBonus(currentStreak);
  const multiplier = DIFFICULTY_MULTIPLIERS[difficulty];

  const totalPoints = Math.round((basePoints + timeBonus + streakBonus) * multiplier);

  return {
    basePoints,
    streakBonus,
    timeBonus,
    difficultyMultiplier: multiplier,
    totalPoints,
  };
}

export function calculateGrade(percentage: number): Grade {
  if (percentage >= 95) return "S";
  if (percentage >= 85) return "A";
  if (percentage >= 75) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 40) return "D";
  return "F";
}

export function updateStreak(streak: StreakState, isCorrect: boolean): StreakState {
  if (isCorrect) {
    const newCurrent = streak.current + 1;
    return {
      current: newCurrent,
      longest: Math.max(newCurrent, streak.longest),
      isActive: true,
    };
  }
  return {
    current: 0,
    longest: streak.longest,
    isActive: false,
  };
}
