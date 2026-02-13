"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "outlined";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl transition-all duration-200",
          variant === "default" && "bg-card text-card-foreground shadow-sm border border-border/50",
          variant === "glass" && "glass text-card-foreground border border-border/30",
          variant === "outlined" && "bg-transparent border-2 border-border text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
export default Card;
