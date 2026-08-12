import { Badge } from "@/components/ui/badge";

const labels: Record<string, string> = {
  planning: "Planning",
  active: "Active",
  on_hold: "On hold",
  completed: "Completed",
  cancelled: "Cancelled",
  todo: "To do",
  in_progress: "In progress",
  review: "In review",
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  active: "default",
  in_progress: "default",
  completed: "secondary",
  planning: "outline",
  todo: "outline",
  review: "outline",
  on_hold: "outline",
  cancelled: "destructive",
  low: "outline",
  medium: "secondary",
  high: "default",
  urgent: "destructive",
};

export const StatusBadge = ({ value }: { value: string }) => (
  <Badge variant={variants[value] ?? "outline"}>{labels[value] ?? value}</Badge>
);

export const formatLabel = (value?: string | null) => (value ? labels[value] ?? value : "—");
