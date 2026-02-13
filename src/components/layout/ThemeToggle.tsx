"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycle = () => {
    const order: Array<"light" | "dark" | "system"> = ["light", "dark", "system"];
    const currentIndex = order.indexOf(theme);
    const next = order[(currentIndex + 1) % order.length];
    setTheme(next);
  };

  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={cycle}
      className={cn(
        "relative p-2.5 rounded-lg transition-colors duration-200",
        "hover:bg-accent text-muted-foreground hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
      aria-label={`Current theme: ${theme}. Click to change.`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ scale: 0, rotate: -90, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="w-5 h-5" />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
