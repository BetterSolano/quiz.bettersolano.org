import type { Metadata } from "next";
import QuizSelectionClient from "./QuizSelectionClient";

export const metadata: Metadata = {
  title: "Choose a Quiz",
  description:
    "Select from History, Culture, Geography, or General Knowledge quiz categories to test your knowledge of Solano, Nueva Vizcaya.",
  openGraph: {
    title: "Choose a Quiz Category | Solano Quiz",
    description:
      "Pick a topic and challenge yourself with interactive questions about Solano's heritage.",
  },
};

export default function QuizSelectionPage() {
  return <QuizSelectionClient />;
}
