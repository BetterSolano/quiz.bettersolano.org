import { Difficulty } from "@/types";

export const BASE_POINTS: Record<Difficulty, number> = {
  easy: 100,
  medium: 200,
  hard: 300,
};

export const DIFFICULTY_MULTIPLIERS: Record<Difficulty, number> = {
  easy: 1.0,
  medium: 1.5,
  hard: 2.0,
};

export const TIME_BONUS_MAX = 50;
export const STREAK_BONUS_PER_LEVEL = 25;
export const MAX_STREAK_BONUS = 200;

export const FEEDBACK_DISPLAY_MS = 2500;
export const COUNTDOWN_SECONDS = 3;
export const QUESTIONS_PER_QUIZ = 8;

export const STORAGE_KEYS = {
  USER_PROGRESS: "solano-quiz-progress",
  ACTIVE_SESSION: "solano-quiz-active-session",
  SETTINGS: "solano-quiz-settings",
} as const;

export const CATEGORY_COLORS: Record<string, string> = {
  history: "amber",
  culture: "violet",
  geography: "emerald",
  general: "blue",
};

export const CATEGORY_ICONS: Record<string, string> = {
  history: "Landmark",
  culture: "Music",
  geography: "MapPin",
  general: "BookOpen",
};

export const GRADE_THRESHOLDS = [
  { grade: "S" as const, min: 95, label: "Supreme" },
  { grade: "A" as const, min: 85, label: "Excellent" },
  { grade: "B" as const, min: 75, label: "Great" },
  { grade: "C" as const, min: 60, label: "Good" },
  { grade: "D" as const, min: 40, label: "Fair" },
  { grade: "F" as const, min: 0, label: "Try Again" },
];
