"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { heroStagger, heroChild } from "@/styles/animations";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={heroChild} className="flex items-center justify-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Learning Experience
            </span>
          </motion.div>

          <motion.h1
            variants={heroChild}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance"
          >
            How well do you know{" "}
            <span className="text-primary">Solano</span>
            <span className="text-muted-foreground">,</span>{" "}
            <span className="text-primary">Nueva Vizcaya</span>
            <span className="text-muted-foreground">?</span>
          </motion.h1>

          <motion.p
            variants={heroChild}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed"
          >
            Test your knowledge of the rich history, vibrant culture, and
            fascinating geography of one of Nueva Vizcaya&apos;s premier municipalities.
          </motion.p>

          <motion.div
            variants={heroChild}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/quiz">
              <Button size="lg" className="group">
                Start Quiz
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                <BookOpen className="w-4 h-4" />
                Learn About Solano
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
