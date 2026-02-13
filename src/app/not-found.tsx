import type { Metadata } from "next";
import NotFoundClient from "./NotFoundClient";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist. Explore Solano Quiz categories or return to the homepage.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundClient />;
}
