"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { scorePopup } from "@/styles/animations";

interface ScorePopupProps {
  points: number;
  show: boolean;
}

export default function ScorePopup({ points, show }: ScorePopupProps) {
  return (
    <AnimatePresence>
      {show && points > 0 && (
        <motion.div
          key={points + Date.now()}
          variants={scorePopup}
          initial="initial"
          animate="animate"
          className="absolute top-0 right-4 flex items-center gap-1 text-primary font-bold text-lg pointer-events-none z-10"
        >
          <Star className="w-5 h-5 fill-primary" />
          +{points}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
