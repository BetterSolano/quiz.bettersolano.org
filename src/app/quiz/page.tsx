"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import CategoryGrid from "@/components/landing/CategoryGrid";
import { UserProgress } from "@/types/storage";
import { getStoredProgress } from "@/lib/storage";
import { heroChild } from "@/styles/animations";

export default function QuizSelectionPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getStoredProgress());
  }, []);

  return (
    <div className="py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={heroChild}
        className="text-center mb-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Brain className="w-4 h-4" />
          Choose Your Challenge
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold">Select a Quiz Category</h1>
        <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
          Each category features unique questions about Solano&apos;s heritage. Pick one to begin.
        </p>
      </motion.div>

      <CategoryGrid progress={progress} />
    </div>
  );
}
