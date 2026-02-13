import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins > 0) {
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }
  return `${secs}s`;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

export function generateSessionId(): string {
  return `quiz_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function normalizeAnswer(answer: string): string {
  return answer.trim().toLowerCase().replace(/\s+/g, " ");
}

export function getPercentage(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}
