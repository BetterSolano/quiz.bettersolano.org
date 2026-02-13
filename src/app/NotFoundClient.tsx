"use client";

import { motion } from "framer-motion";
import { Home, Brain, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { heroStagger, heroChild } from "@/styles/animations";

export default function NotFoundClient() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] px-4">
      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="visible"
        className="max-w-lg mx-auto text-center space-y-8"
      >
        {/* 404 display */}
        <motion.div variants={heroChild} className="space-y-2">
          <div className="text-8xl sm:text-9xl font-bold tracking-tighter text-primary/20 select-none">
            404
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold -mt-4">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
            Looks like this page wandered off the map. It might have been moved,
            renamed, or may never have existed.
          </p>
        </motion.div>

        {/* Recovery actions */}
        <motion.div
          variants={heroChild}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/">
            <Button size="lg" className="group">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/quiz">
            <Button variant="outline" size="lg" className="group">
              <Brain className="w-4 h-4" />
              Take a Quiz
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        {/* Quick links */}
        <motion.div variants={heroChild}>
          <p className="text-sm text-muted-foreground mb-3">Or explore these pages:</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { href: "/about", label: "About Solano" },
              { href: "/leaderboard", label: "Score History" },
              { href: "/mechanics", label: "Quiz Mechanics" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <MapPin className="w-3 h-3" />
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
