import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Solano",
  description:
    "Learn about Solano, Nueva Vizcaya — its founding in 1767, Gaddang heritage, notable landmarks like St. Louis Beltran Church, and its role as the commercial center of the province.",
  openGraph: {
    title: "About Solano, Nueva Vizcaya | Solano Quiz",
    description:
      "Discover the history, culture, and landmarks of Solano, Nueva Vizcaya — from its Gaddang origins to its modern-day significance.",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
