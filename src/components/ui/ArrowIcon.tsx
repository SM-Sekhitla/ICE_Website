import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react";

export function ArrowIcon({ direction = "up-right" }: { direction?: "up-right" | "up" | "down" }) {
  const Icon = direction === "down" ? ArrowDown : direction === "up" ? ArrowUp : ArrowUpRight;
  return <Icon className="arrow-icon" aria-hidden="true" focusable="false" />;
}
