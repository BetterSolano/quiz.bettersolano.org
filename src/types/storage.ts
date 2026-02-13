import { CategoryId } from "./quiz";
import { QuizResult } from "./scoring";

export interface UserProgress {
  totalQuizzesTaken: number;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  overallAccuracy: number;
  totalPointsEarned: number;
  longestStreak: number;
  categoryProgress: Record<CategoryId, CategoryProgress>;
  quizHistory: QuizResult[];
  achievements: string[];
  settings: UserSettings;
  lastPlayedAt: number;
}

export interface CategoryProgress {
  categoryId: CategoryId;
  timesPlayed: number;
  bestScore: number;
  bestPercentage: number;
  averageScore: number;
  questionsAnswered: number;
  correctAnswers: number;
}

export interface UserSettings {
  theme: "light" | "dark" | "system";
  soundEnabled: boolean;
  reducedMotion: boolean;
  fontSize: "normal" | "large";
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconName: string;
  condition: (progress: UserProgress) => boolean;
  unlockedAt?: number;
}
