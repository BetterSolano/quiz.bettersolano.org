import { CategoryId, Question } from "@/types";
import { historyQuestions } from "./history";
import { cultureQuestions } from "./culture";
import { geographyQuestions } from "./geography";
import { generalQuestions } from "./general";

export const questionsByCategory: Record<CategoryId, Question[]> = {
  history: historyQuestions,
  culture: cultureQuestions,
  geography: geographyQuestions,
  general: generalQuestions,
};

export function getQuestionsByCategory(categoryId: CategoryId): Question[] {
  return questionsByCategory[categoryId] || [];
}
