import type { Metadata } from "next";
import { categories } from "@/data/categories";
import QuizSessionClient from "./QuizSessionClient";

export function generateStaticParams() {
  return categories.map((category) => ({
    categoryId: category.id,
  }));
}

export function generateMetadata({ params }: { params: { categoryId: string } }): Metadata {
  const category = categories.find((c) => c.id === params.categoryId);
  const name = category?.name ?? "Quiz";
  return {
    title: `${name} Quiz`,
    description: category
      ? `Test your knowledge of Solano's ${name.toLowerCase()} with ${category.questionCount} interactive questions. ${category.description}`
      : "Take an interactive quiz about Solano, Nueva Vizcaya.",
    openGraph: {
      title: `${name} Quiz | Solano Quiz`,
      description: category?.description ?? "Interactive quiz about Solano, Nueva Vizcaya.",
    },
  };
}

export default function QuizSessionPage() {
  return <QuizSessionClient />;
}
