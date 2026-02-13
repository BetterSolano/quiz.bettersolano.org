export type QuestionType = "multiple-choice" | "true-false" | "image-based" | "fill-in-blank";
export type Difficulty = "easy" | "medium" | "hard";
export type CategoryId = "history" | "culture" | "geography" | "general";

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  category: CategoryId;
  difficulty: Difficulty;
  question: string;
  explanation: string;
  source?: string;
  timeLimit: number;
  points: number;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple-choice";
  options: string[];
  correctIndex: number;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: "true-false";
  correctAnswer: boolean;
}

export interface ImageBasedQuestion extends BaseQuestion {
  type: "image-based";
  imageSrc: string;
  imageAlt: string;
  options: string[];
  correctIndex: number;
}

export interface FillInBlankQuestion extends BaseQuestion {
  type: "fill-in-blank";
  acceptedAnswers: string[];
  hint?: string;
  blankedSentence: string;
}

export type Question =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | ImageBasedQuestion
  | FillInBlankQuestion;

export interface QuizCategory {
  id: CategoryId;
  name: string;
  description: string;
  iconName: string;
  color: string;
  questionCount: number;
  estimatedMinutes: number;
}

export interface QuizSession {
  id: string;
  categoryId: CategoryId;
  questions: Question[];
  currentIndex: number;
  answers: UserAnswer[];
  startedAt: number;
  completedAt?: number;
  status: "in-progress" | "completed" | "abandoned";
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: string | number | boolean;
  isCorrect: boolean;
  timeSpent: number;
  pointsEarned: number;
  streakAtTime: number;
}

export type QuizState =
  | "loading"
  | "ready"
  | "question"
  | "answered"
  | "feedback"
  | "transitioning"
  | "completed";
