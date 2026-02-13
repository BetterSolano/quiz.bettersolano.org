import { QuizCategory } from "@/types";

export const categories: QuizCategory[] = [
  {
    id: "history",
    name: "History & Founding",
    description: "Explore the rich historical origins and pivotal moments that shaped Solano from a Gaddang settlement to a thriving municipality.",
    iconName: "Landmark",
    color: "amber",
    questionCount: 8,
    estimatedMinutes: 4,
  },
  {
    id: "culture",
    name: "Culture & Festivals",
    description: "Discover the vibrant cultural heritage, religious traditions, and festive celebrations that define Solano's identity.",
    iconName: "Music",
    color: "violet",
    questionCount: 8,
    estimatedMinutes: 4,
  },
  {
    id: "geography",
    name: "Geography & Landmarks",
    description: "Test your knowledge of Solano's geographical features, barangays, and iconic landmarks.",
    iconName: "MapPin",
    color: "emerald",
    questionCount: 8,
    estimatedMinutes: 4,
  },
  {
    id: "general",
    name: "General Knowledge",
    description: "A comprehensive mix covering governance, demographics, economy, and fascinating facts about Solano.",
    iconName: "BookOpen",
    color: "blue",
    questionCount: 6,
    estimatedMinutes: 3,
  },
];
