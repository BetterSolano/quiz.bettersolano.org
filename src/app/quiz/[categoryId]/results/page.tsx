import { categories } from "@/data/categories";
import ResultsClient from "./ResultsClient";

export function generateStaticParams() {
  return categories.map((category) => ({
    categoryId: category.id,
  }));
}

export default function ResultsPage() {
  return <ResultsClient />;
}
