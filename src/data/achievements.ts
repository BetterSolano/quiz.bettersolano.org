import { Achievement } from "@/types/storage";

export const achievements: Achievement[] = [
  {
    id: "first-quiz",
    name: "First Steps",
    description: "Complete your first quiz",
    iconName: "Footprints",
    condition: (p) => p.totalQuizzesTaken >= 1,
  },
  {
    id: "perfect-score",
    name: "Perfection",
    description: "Score 100% on any quiz",
    iconName: "Crown",
    condition: (p) => p.quizHistory.some((q) => q.percentage === 100),
  },
  {
    id: "streak-5",
    name: "On Fire",
    description: "Achieve a 5-question streak",
    iconName: "Flame",
    condition: (p) => p.longestStreak >= 5,
  },
  {
    id: "all-categories",
    name: "Well-Rounded",
    description: "Complete a quiz in every category",
    iconName: "Globe",
    condition: (p) =>
      Object.values(p.categoryProgress).every((cat) => cat.timesPlayed >= 1),
  },
  {
    id: "quiz-master",
    name: "Quiz Master",
    description: "Complete 10 quizzes",
    iconName: "GraduationCap",
    condition: (p) => p.totalQuizzesTaken >= 10,
  },
  {
    id: "speed-demon",
    name: "Speed Demon",
    description: "Complete a quiz with an average time under 5 seconds per question",
    iconName: "Zap",
    condition: (p) => p.quizHistory.some((q) => q.averageTimePerQuestion < 5),
  },
  {
    id: "historian",
    name: "Historian",
    description: "Score an A or S grade in History",
    iconName: "Landmark",
    condition: (p) =>
      p.quizHistory.some((q) => q.categoryId === "history" && (q.grade === "A" || q.grade === "S")),
  },
  {
    id: "culturist",
    name: "Culture Buff",
    description: "Score an A or S grade in Culture",
    iconName: "Music",
    condition: (p) =>
      p.quizHistory.some((q) => q.categoryId === "culture" && (q.grade === "A" || q.grade === "S")),
  },
  {
    id: "points-1000",
    name: "Point Collector",
    description: "Earn 1,000 total points",
    iconName: "Star",
    condition: (p) => p.totalPointsEarned >= 1000,
  },
  {
    id: "points-5000",
    name: "High Scorer",
    description: "Earn 5,000 total points",
    iconName: "TrendingUp",
    condition: (p) => p.totalPointsEarned >= 5000,
  },
];
