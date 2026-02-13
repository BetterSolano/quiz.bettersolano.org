"use client";

import ProgressBar from "@/components/ui/ProgressBar";
import { Hash } from "lucide-react";

interface QuizProgressProps {
  current: number;
  total: number;
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Hash className="w-3.5 h-3.5" />
          Question {current + 1} of {total}
        </span>
        <span className="text-muted-foreground font-medium">
          {Math.round(((current) / total) * 100)}%
        </span>
      </div>
      <ProgressBar value={current} max={total} variant="primary" size="sm" />
    </div>
  );
}
