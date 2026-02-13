"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy, BarChart3, Target, Flame, Star, Clock,
  Unlock, Lock, Landmark, Music, MapPin, BookOpen,
} from "lucide-react";
import { UserProgress } from "@/types/storage";
import { QuizResult, Grade } from "@/types/scoring";
import { getStoredProgress } from "@/lib/storage";
import { categories } from "@/data/categories";
import { achievements } from "@/data/achievements";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import CountUpNumber from "@/components/ui/CountUpNumber";
import { staggerContainer, staggerItem, heroChild } from "@/styles/animations";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Landmark, Music, MapPin, BookOpen, Flame, Star, Trophy,
  Unlock, Lock, BarChart3, Target,
};

const gradeColors: Record<Grade, string> = {
  S: "text-amber-500",
  A: "text-emerald-500",
  B: "text-blue-500",
  C: "text-violet-500",
  D: "text-orange-500",
  F: "text-error",
};

export default function LeaderboardClient() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getStoredProgress());
  }, []);

  if (!progress) return null;

  const hasPlayed = progress.totalQuizzesTaken > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <motion.div variants={heroChild} initial="hidden" animate="visible" className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Trophy className="w-4 h-4" />
          Your Progress
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold">Score History</h1>
        <p className="mt-3 text-muted-foreground">
          {hasPlayed
            ? "Track your progress and achievements across all categories."
            : "Complete a quiz to see your stats here."}
        </p>
      </motion.div>

      {hasPlayed && (
        <>
          {/* Lifetime Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: BarChart3, label: "Quizzes Taken", value: progress.totalQuizzesTaken, color: "text-blue-500" },
              { icon: Target, label: "Accuracy", value: progress.overallAccuracy, suffix: "%", color: "text-emerald-500" },
              { icon: Flame, label: "Best Streak", value: progress.longestStreak, color: "text-amber-500" },
              { icon: Star, label: "Total Points", value: progress.totalPointsEarned, color: "text-violet-500" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} variants={staggerItem}>
                  <Card className="p-5 text-center">
                    <Icon className={cn("w-5 h-5 mx-auto mb-2", stat.color)} />
                    <div className="text-2xl font-bold">
                      <CountUpNumber end={stat.value} suffix={stat.suffix || ""} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Category Progress */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Category Progress</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat) => {
                const catProgress = progress.categoryProgress[cat.id];
                const CatIcon = iconMap[cat.iconName] || BookOpen;
                return (
                  <Card key={cat.id} className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <CatIcon className="w-5 h-5 text-muted-foreground" />
                      <span className="font-semibold">{cat.name}</span>
                    </div>
                    {catProgress.timesPlayed > 0 ? (
                      <div className="grid grid-cols-3 gap-3 text-center text-sm">
                        <div>
                          <div className="font-bold">{catProgress.timesPlayed}</div>
                          <div className="text-xs text-muted-foreground">Played</div>
                        </div>
                        <div>
                          <div className="font-bold">{catProgress.bestPercentage}%</div>
                          <div className="text-xs text-muted-foreground">Best</div>
                        </div>
                        <div>
                          <div className="font-bold">{catProgress.bestScore}</div>
                          <div className="text-xs text-muted-foreground">High Score</div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Not played yet</p>
                    )}
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Recent History */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Recent Quizzes</h2>
            <div className="space-y-3">
              {progress.quizHistory.slice(0, 10).map((result: QuizResult) => {
                const cat = categories.find((c) => c.id === result.categoryId);
                return (
                  <Card key={result.sessionId} className="p-4 flex items-center gap-4">
                    <div
                      className={cn(
                        "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg",
                        gradeColors[result.grade],
                        "bg-muted"
                      )}
                    >
                      {result.grade}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{cat?.name || result.categoryId}</p>
                      <p className="text-xs text-muted-foreground">
                        {result.correctCount}/{result.totalQuestions} correct &middot;{" "}
                        {result.totalScore} pts &middot;{" "}
                        {new Date(result.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={result.percentage >= 75 ? "success" : result.percentage >= 50 ? "warning" : "error"}>
                      {result.percentage}%
                    </Badge>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Achievements */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Achievements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {achievements.map((achievement) => {
                const isUnlocked = achievement.condition(progress);
                const AchIcon = iconMap[achievement.iconName] || Star;
                return (
                  <Card
                    key={achievement.id}
                    className={cn(
                      "p-4 flex items-center gap-3",
                      !isUnlocked && "opacity-50"
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        isUnlocked ? "bg-primary/10" : "bg-muted"
                      )}
                    >
                      {isUnlocked ? (
                        <AchIcon className="w-5 h-5 text-primary" />
                      ) : (
                        <Lock className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{achievement.name}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        </>
      )}

      {!hasPlayed && (
        <div className="text-center py-16">
          <Trophy className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">
            Your quiz history and achievements will appear here after completing your first quiz.
          </p>
        </div>
      )}
    </div>
  );
}
