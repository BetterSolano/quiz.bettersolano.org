import { CircleDot, Circle, Hexagon } from "lucide-react";
import { Difficulty } from "@/types";
import Badge from "@/components/ui/Badge";

const config: Record<Difficulty, { icon: React.ComponentType<{ className?: string }>; label: string; variant: "success" | "warning" | "error" }> = {
  easy: { icon: CircleDot, label: "Easy", variant: "success" },
  medium: { icon: Circle, label: "Medium", variant: "warning" },
  hard: { icon: Hexagon, label: "Hard", variant: "error" },
};

export default function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const { icon: Icon, label, variant } = config[difficulty];
  return (
    <Badge variant={variant} size="sm">
      <Icon className="w-3 h-3" />
      {label}
    </Badge>
  );
}
