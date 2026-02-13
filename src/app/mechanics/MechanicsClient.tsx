"use client";

import { motion } from "framer-motion";
import {
  Cog, ArrowRight, Timer, CheckCircle, XCircle, Flame, Award,
  ShieldCheck, Zap, BookOpen, BarChart3, AlertTriangle, ArrowRightLeft,
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { heroStagger, heroChild, staggerContainer, staggerItem } from "@/styles/animations";
import {
  BASE_POINTS,
  DIFFICULTY_MULTIPLIERS,
  TIME_BONUS_MAX,
  STREAK_BONUS_PER_LEVEL,
  MAX_STREAK_BONUS,
  FEEDBACK_DISPLAY_MS,
  QUESTIONS_PER_QUIZ,
} from "@/lib/constants";

const questionTypes = [
  {
    name: "Multiple Choice",
    description: "Four options (A-D). Select the single correct answer. Options are locked immediately on selection.",
    validation: "Strict index equality — selectedIndex === correctIndex.",
  },
  {
    name: "True / False",
    description: "Two options (True or False). Select the statement that matches the claim.",
    validation: "Boolean equality — selectedAnswer === correctAnswer.",
  },
  {
    name: "Image-Based",
    description: "A reference image is shown alongside four text options. Identical to multiple choice in validation.",
    validation: "Strict index equality — selectedIndex === correctIndex.",
  },
  {
    name: "Fill-in-the-Blank",
    description: "A sentence with a blank. Type the answer and submit. Case-insensitive with whitespace normalization.",
    validation: "Normalized string match against an array of accepted answers.",
  },
];

const stateTransitions = [
  { from: "ready", to: "question", trigger: "User clicks \"Start Quiz\"", description: "Timer starts, first question displayed." },
  { from: "question", to: "answered", trigger: "User selects answer or timer expires", description: "Options lock, pulse/shake animation plays. Timer stops." },
  { from: "answered", to: "feedback", trigger: `Automatic after ${FEEDBACK_DISPLAY_MS}ms or user tap`, description: "Explanation panel slides in with Continue button." },
  { from: "feedback", to: "transitioning", trigger: "User clicks \"Continue\"", description: "Card exit animation begins. No interaction possible." },
  { from: "transitioning", to: "question", trigger: "Exit animation completes (next question)", description: "New question card enters. Timer resets and starts." },
  { from: "transitioning", to: "completed", trigger: "No more questions", description: "Results calculated, persisted, and navigation triggered." },
  { from: "completed", to: "ready", trigger: "User clicks \"Restart\"", description: "Questions re-shuffled, all state reset." },
];

const scoringRules = [
  {
    icon: BarChart3,
    label: "Base Points",
    detail: `Easy: ${BASE_POINTS.easy}  |  Medium: ${BASE_POINTS.medium}  |  Hard: ${BASE_POINTS.hard}`,
  },
  {
    icon: Zap,
    label: "Time Bonus",
    detail: `Up to +${TIME_BONUS_MAX} pts. Full bonus for answering within 25% of the time limit; linear decay to 0 at 100%.`,
  },
  {
    icon: Flame,
    label: "Streak Bonus",
    detail: `+${STREAK_BONUS_PER_LEVEL} pts per consecutive correct answer (max +${MAX_STREAK_BONUS}). Resets to 0 on any incorrect answer.`,
  },
  {
    icon: Award,
    label: "Difficulty Multiplier",
    detail: `Easy: x${DIFFICULTY_MULTIPLIERS.easy}  |  Medium: x${DIFFICULTY_MULTIPLIERS.medium}  |  Hard: x${DIFFICULTY_MULTIPLIERS.hard} — applied to (base + time + streak).`,
  },
];

const edgeCases = [
  {
    icon: Timer,
    label: "Timer Expiry",
    detail: "If the timer reaches zero, a sentinel value (-1) is submitted. The answer is always scored as incorrect with 0 points.",
  },
  {
    icon: ShieldCheck,
    label: "Double-Click Protection",
    detail: "Every state transition is validated against a strict transition table. Clicking \"Continue\" twice is silently rejected — the second call finds the state is no longer \"feedback\" and returns without mutating.",
  },
  {
    icon: AlertTriangle,
    label: "Stale Answer Prevention",
    detail: "The current answer is derived by question ID (not array position). Even if answers are reordered or a question is somehow skipped, the UI always shows feedback for the correct question.",
  },
  {
    icon: ArrowRightLeft,
    label: "Animation–State Synchronisation",
    detail: "The \"answered\" intermediate state gives the animation system a full settled render frame before the feedback panel appears. Pulse/shake targets are defined within the same variant set as the entry animation, preventing orphaned animation states.",
  },
];

const grades = [
  { grade: "S", min: 95, label: "Supreme", color: "text-amber-500" },
  { grade: "A", min: 85, label: "Excellent", color: "text-emerald-500" },
  { grade: "B", min: 75, label: "Great", color: "text-blue-500" },
  { grade: "C", min: 60, label: "Good", color: "text-sky-500" },
  { grade: "D", min: 40, label: "Fair", color: "text-orange-500" },
  { grade: "F", min: 0, label: "Try Again", color: "text-red-500" },
];

export default function MechanicsClient() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="visible"
        className="text-center max-w-3xl mx-auto"
      >
        <motion.div variants={heroChild}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Cog className="w-3.5 h-3.5" />
            Product Documentation
          </span>
        </motion.div>
        <motion.h1 variants={heroChild} className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Quiz Mechanics
        </motion.h1>
        <motion.p variants={heroChild} className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Formal specification of quiz behavior, state management, scoring logic,
          and edge-case handling. This document is the authoritative reference for
          how the quiz engine operates.
        </motion.p>
      </motion.div>

      {/* Section 1: Question Types */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Question Types</h2>
        <p className="text-muted-foreground mb-6">
          Each quiz draws {QUESTIONS_PER_QUIZ} questions from a shuffled pool. Four question formats are supported.
        </p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {questionTypes.map((qt) => (
            <motion.div key={qt.name} variants={staggerItem}>
              <Card className="p-5 h-full space-y-2">
                <h3 className="font-semibold">{qt.name}</h3>
                <p className="text-sm text-muted-foreground">{qt.description}</p>
                <p className="text-xs font-mono text-muted-foreground/70 bg-muted/50 rounded-md px-2.5 py-1.5">
                  {qt.validation}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Section 2: State Machine */}
      <section>
        <h2 className="text-2xl font-bold mb-2">State Machine &amp; Lifecycle</h2>
        <p className="text-muted-foreground mb-6">
          The quiz engine enforces a strict finite-state machine. Every transition is validated
          against a compile-time transition table — invalid transitions are silently rejected,
          preventing race conditions and double-mutation.
        </p>
        <div className="mb-8 overflow-x-auto">
          <div className="inline-flex items-center gap-2 text-sm font-mono bg-muted/50 rounded-xl px-6 py-4 border border-border/50 min-w-max">
            <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary font-semibold">ready</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-500 font-semibold">question</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-500 font-semibold">answered</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-500 font-semibold">feedback</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <span className="px-2.5 py-1 rounded-md bg-violet-500/10 text-violet-500 font-semibold">transitioning</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-500 font-semibold">question</span>
            <span className="text-muted-foreground mx-1">/</span>
            <span className="px-2.5 py-1 rounded-md bg-red-500/10 text-red-500 font-semibold">completed</span>
          </div>
        </div>
        <div className="border border-border/50 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border/50">
                <th className="text-left px-4 py-3 font-semibold">From</th>
                <th className="text-left px-4 py-3 font-semibold">To</th>
                <th className="text-left px-4 py-3 font-semibold">Trigger</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Effect</th>
              </tr>
            </thead>
            <tbody>
              {stateTransitions.map((t, i) => (
                <tr key={i} className="border-b border-border/30 last:border-0">
                  <td className="px-4 py-3 font-mono text-xs">{t.from}</td>
                  <td className="px-4 py-3 font-mono text-xs">{t.to}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.trigger}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Scoring Logic */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Scoring Logic</h2>
        <p className="text-muted-foreground mb-6">
          Each correct answer earns points from three additive components, multiplied by difficulty.
          Incorrect answers always score 0 — no partial credit.
        </p>
        <div className="bg-muted/50 border border-border/50 rounded-xl px-5 py-4 mb-6 font-mono text-sm text-center">
          totalPoints = (basePoints + timeBonus + streakBonus) &times; difficultyMultiplier
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {scoringRules.map((rule) => {
            const Icon = rule.icon;
            return (
              <motion.div key={rule.label} variants={staggerItem}>
                <Card className="p-5 h-full">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{rule.label}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{rule.detail}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Section 4: Grade Thresholds */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Grade Thresholds</h2>
        <p className="text-muted-foreground mb-6">
          Final grade is determined by the percentage of questions answered correctly (not points).
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {grades.map((g) => (
            <div
              key={g.grade}
              className="flex flex-col items-center gap-1 px-5 py-3 rounded-xl border border-border/50 bg-card min-w-[90px]"
            >
              <span className={`text-2xl font-bold ${g.color}`}>{g.grade}</span>
              <span className="text-xs font-medium text-foreground">{g.label}</span>
              <span className="text-xs text-muted-foreground">{g.min}%+</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Feedback Handling */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Feedback Handling</h2>
        <p className="text-muted-foreground mb-6">
          After every answer, two phases of feedback are shown to reinforce learning.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-5 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <h3 className="font-semibold">Answered Phase ({FEEDBACK_DISPLAY_MS / 1000}s)</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Options are locked immediately. The correct answer pulses green; an incorrect selection
              shakes red. Other options dim to 50% opacity. This phase lasts {FEEDBACK_DISPLAY_MS}ms
              (configurable via <span className="font-mono text-xs">FEEDBACK_DISPLAY_MS</span>) before
              automatically advancing to the feedback panel.
            </p>
          </Card>
          <Card className="p-5 space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Feedback Phase</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              An explanation panel slides in below the question card, showing a contextual
              explanation sourced from the question data. A &quot;Continue&quot; button advances to the
              next question. Points earned and streak status are displayed inline.
            </p>
          </Card>
        </div>
      </section>

      {/* Section 6: Edge Cases & Safety */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Edge Cases &amp; Safety Guarantees</h2>
        <p className="text-muted-foreground mb-6">
          The engine is designed to prevent every known class of state corruption.
        </p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {edgeCases.map((ec) => {
            const Icon = ec.icon;
            return (
              <motion.div key={ec.label} variants={staggerItem}>
                <Card className="p-5 h-full">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{ec.label}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{ec.detail}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Section 7: User Interaction Rules */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">User Interaction Rules</h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">1</span>
            <p><strong className="text-foreground">One answer per question.</strong> Once an option is selected (or the timer expires), the answer is final. There is no undo mechanism.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">2</span>
            <p><strong className="text-foreground">Timer is per-question.</strong> Each question has its own time limit (defined in question data). The timer resets on every new question.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">3</span>
            <p><strong className="text-foreground">Questions are shuffled per session.</strong> The order is randomized using Fisher-Yates shuffle on session start. Restarting produces a new order.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">4</span>
            <p><strong className="text-foreground">Results are persisted to localStorage.</strong> Quiz history, best scores, and streaks are stored client-side and survive page refreshes.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">5</span>
            <p><strong className="text-foreground">No backwards navigation.</strong> Users cannot return to a previous question. The quiz is strictly forward-progressing.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Play?</h2>
        <p className="text-muted-foreground mb-6">
          Now that you know the rules, put your knowledge to the test.
        </p>
        <Link href="/quiz">
          <Button size="lg" className="group">
            Start a Quiz
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
