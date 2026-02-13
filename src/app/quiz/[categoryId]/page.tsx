import { categories } from "@/data/categories";
import QuizSessionClient from "./QuizSessionClient";

export function generateStaticParams() {
  return categories.map((category) => ({
    categoryId: category.id,
  }));
}

export default function QuizSessionPage() {
  return <QuizSessionClient />;
}
