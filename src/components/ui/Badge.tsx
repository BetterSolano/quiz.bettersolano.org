import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "error" | "warning" | "outline";
  size?: "sm" | "md";
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  error: "bg-error/10 text-error",
  warning: "bg-warning/10 text-warning",
  outline: "border border-border text-muted-foreground",
};

export default function Badge({ children, variant = "default", size = "sm", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium rounded-full",
        size === "sm" && "px-2.5 py-0.5 text-xs",
        size === "md" && "px-3 py-1 text-sm",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
