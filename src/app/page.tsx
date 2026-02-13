"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/landing/HeroSection";
import CategoryGrid from "@/components/landing/CategoryGrid";
import StatsOverview from "@/components/landing/StatsOverview";
import { UserProgress } from "@/types/storage";
import { getStoredProgress } from "@/lib/storage";

export default function HomePage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getStoredProgress());
  }, []);

  return (
    <>
      <HeroSection />
      <CategoryGrid progress={progress} />
      {progress && <StatsOverview progress={progress} />}
    </>
  );
}
