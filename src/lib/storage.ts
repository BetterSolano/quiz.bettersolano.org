import { QuizSession, CategoryId } from "@/types";
import { QuizResult } from "@/types/scoring";
import { UserProgress, CategoryProgress, UserSettings } from "@/types/storage";
import { STORAGE_KEYS } from "./constants";

function getDefaultCategoryProgress(categoryId: CategoryId): CategoryProgress {
  return {
    categoryId,
    timesPlayed: 0,
    bestScore: 0,
    bestPercentage: 0,
    averageScore: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
  };
}

export function getDefaultProgress(): UserProgress {
  return {
    totalQuizzesTaken: 0,
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
    overallAccuracy: 0,
    totalPointsEarned: 0,
    longestStreak: 0,
    categoryProgress: {
      history: getDefaultCategoryProgress("history"),
      culture: getDefaultCategoryProgress("culture"),
      geography: getDefaultCategoryProgress("geography"),
      general: getDefaultCategoryProgress("general"),
    },
    quizHistory: [],
    achievements: [],
    settings: {
      theme: "system",
      soundEnabled: false,
      reducedMotion: false,
      fontSize: "normal",
    },
    lastPlayedAt: 0,
  };
}

export function getStoredProgress(): UserProgress {
  if (typeof window === "undefined") return getDefaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    return raw ? JSON.parse(raw) : getDefaultProgress();
  } catch {
    return getDefaultProgress();
  }
}

export function setStoredProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.warn("Failed to persist progress:", e);
  }
}

export function getActiveSession(): QuizSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setActiveSession(session: QuizSession | null): void {
  if (typeof window === "undefined") return;
  try {
    if (session) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
    }
  } catch (e) {
    console.warn("Failed to persist session:", e);
  }
}

export function getSettings(): UserSettings {
  if (typeof window === "undefined") {
    return { theme: "system", soundEnabled: false, reducedMotion: false, fontSize: "normal" };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw
      ? JSON.parse(raw)
      : { theme: "system", soundEnabled: false, reducedMotion: false, fontSize: "normal" };
  } catch {
    return { theme: "system", soundEnabled: false, reducedMotion: false, fontSize: "normal" };
  }
}

export function setSettings(settings: UserSettings): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.warn("Failed to persist settings:", e);
  }
}

export function updateProgressWithResult(result: QuizResult): UserProgress {
  const progress = getStoredProgress();

  progress.totalQuizzesTaken += 1;
  progress.totalQuestionsAnswered += result.totalQuestions;
  progress.totalCorrect += result.correctCount;
  progress.overallAccuracy =
    progress.totalQuestionsAnswered > 0
      ? Math.round((progress.totalCorrect / progress.totalQuestionsAnswered) * 100)
      : 0;
  progress.totalPointsEarned += result.totalScore;
  progress.longestStreak = Math.max(progress.longestStreak, result.longestStreak);
  progress.lastPlayedAt = Date.now();

  const catProgress = progress.categoryProgress[result.categoryId];
  catProgress.timesPlayed += 1;
  catProgress.bestScore = Math.max(catProgress.bestScore, result.totalScore);
  catProgress.bestPercentage = Math.max(catProgress.bestPercentage, result.percentage);
  catProgress.questionsAnswered += result.totalQuestions;
  catProgress.correctAnswers += result.correctCount;
  catProgress.averageScore = Math.round(
    (catProgress.averageScore * (catProgress.timesPlayed - 1) + result.totalScore) /
      catProgress.timesPlayed
  );

  progress.quizHistory.unshift(result);
  if (progress.quizHistory.length > 50) {
    progress.quizHistory = progress.quizHistory.slice(0, 50);
  }

  setStoredProgress(progress);
  return progress;
}
