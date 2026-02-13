"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "success" | "error";
  size?: "sm" | "md" | "lg";
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost:
    "hover:bg-accent hover:text-accent-foreground",
  outline:
    "border-2 border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
  success:
    "bg-success text-success-foreground hover:bg-success/90 shadow-md shadow-success/20",
  error:
    "bg-error text-error-foreground hover:bg-error/90 shadow-md shadow-error/20",
};

const sizeStyles: Record<string, string> = {
  sm: "min-h-9 h-auto py-2 px-4 text-sm rounded-md",
  md: "min-h-11 h-auto py-2.5 px-6 text-sm rounded-lg",
  lg: "min-h-[3.25rem] h-auto py-3 px-8 text-base rounded-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={disabled ? {} : { scale: 1.02 }}
        whileTap={disabled ? {} : { scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 whitespace-normal text-center",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
