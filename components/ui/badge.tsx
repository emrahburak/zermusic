import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Badge — small status / category pill.
 *
 * Server Component (no client hooks). Used for category labels, stock
 * indicators, and other inline metadata.
 */
export interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "accent" | "muted";
  className?: string;
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  muted: "bg-muted text-muted-foreground",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium uppercase tracking-wide",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}