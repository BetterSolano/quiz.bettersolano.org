import type { Metadata } from "next";
import LeaderboardClient from "./LeaderboardClient";

export const metadata: Metadata = {
  title: "Score History & Achievements",
  description:
    "Track your Solano Quiz progress — view lifetime stats, category scores, recent quiz history, and unlocked achievements.",
  openGraph: {
    title: "Score History & Achievements | Solano Quiz",
    description:
      "See your quiz stats, best scores, streaks, and achievements across all Solano quiz categories.",
  },
};

export default function LeaderboardPage() {
  return <LeaderboardClient />;
}
