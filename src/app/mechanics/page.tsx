import type { Metadata } from "next";
import MechanicsClient from "./MechanicsClient";

export const metadata: Metadata = {
  title: "Quiz Mechanics",
  description:
    "Understand how the Solano Quiz works — question types, scoring formula, streak bonuses, difficulty multipliers, grade thresholds, and state machine behavior.",
  openGraph: {
    title: "Quiz Mechanics | Solano Quiz",
    description:
      "Complete reference for quiz scoring, question formats, and game rules in the Solano Quiz.",
  },
};

export default function MechanicsPage() {
  return <MechanicsClient />;
}
