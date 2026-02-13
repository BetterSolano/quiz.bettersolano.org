import { Variants, Transition } from "framer-motion";

const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

// Page transitions
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

// Question card swap
export const questionSlide: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.25 },
  }),
};

// Answer option stagger
export const optionContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

export const optionItem: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springTransition,
  },
};

// Correct answer pulse
export const correctPulse: Variants = {
  initial: { scale: 1 },
  pulse: {
    scale: [1, 1.03, 1],
    transition: { duration: 0.4 },
  },
};

// Incorrect answer shake
export const incorrectShake: Variants = {
  initial: { x: 0 },
  shake: {
    x: [-8, 8, -6, 6, -3, 3, 0],
    transition: { duration: 0.5 },
  },
};

// Score popup float
export const scorePopup: Variants = {
  initial: { opacity: 0, y: 0, scale: 0.5 },
  animate: {
    opacity: [0, 1, 1, 0],
    y: [0, -40, -60, -80],
    scale: [0.5, 1.2, 1, 0.8],
    transition: { duration: 1.2, times: [0, 0.2, 0.6, 1] },
  },
};

// Streak flame animation
export const streakFlame: Variants = {
  idle: { scale: 1, rotate: 0 },
  active: {
    scale: [1, 1.15, 1],
    rotate: [-3, 3, -2, 2, 0],
    transition: { duration: 0.6, repeat: Infinity, repeatType: "reverse" as const },
  },
};

// Timer warning pulse
export const timerPulse: Variants = {
  normal: { scale: 1 },
  warning: {
    scale: [1, 1.1, 1],
    transition: { duration: 0.5, repeat: Infinity },
  },
};

// Results page reveal
export const resultsFanfare: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Category card hover
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.03,
    y: -4,
    transition: springTransition,
  },
  tap: { scale: 0.98 },
};

// Feedback slide up
export const feedbackSlideUp: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 400, damping: 35 },
  },
  exit: {
    y: 40,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

// Countdown animation
export const countdownNumber: Variants = {
  enter: { scale: 0, opacity: 0, rotate: -90 },
  center: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 500, damping: 25 },
  },
  exit: {
    scale: 2,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

// Hero section stagger
export const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

export const heroChild: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Stagger children generic
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};
