import type { Metadata } from "next";
import { categories } from "@/data/categories";
import ResultsClient from "./ResultsClient";

export function generateStaticParams() {
  return categories.map((category) => ({
    categoryId: category.id,
  }));
}

export function generateMetadata({ params }: { params: { categoryId: string } }): Metadata {
  const category = categories.find((c) => c.id === params.categoryId);
  const name = category?.name ?? "Quiz";
  return {
    title: `${name} Results`,
    description: `View your ${name.toLowerCase()} quiz results, score breakdown, and answer review for Solano, Nueva Vizcaya.`,
    robots: { index: false, follow: true },
  };
}

export default function ResultsPage() {
  return <ResultsClient />;
}
