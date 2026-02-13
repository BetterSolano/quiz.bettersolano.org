"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import { UserProgress } from "@/types/storage";
import CategoryCard from "./CategoryCard";
import { staggerContainer, staggerItem } from "@/styles/animations";

interface CategoryGridProps {
  progress?: UserProgress | null;
}

export default function CategoryGrid({ progress }: CategoryGridProps) {
  const router = useRouter();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold">Choose a Category</h2>
        <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
          Select a topic to begin your quiz journey through Solano&apos;s heritage.
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {categories.map((category) => (
          <motion.div key={category.id} variants={staggerItem}>
            <CategoryCard
              category={category}
              progress={progress?.categoryProgress[category.id]}
              onClick={() => router.push(`/quiz/${category.id}`)}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
