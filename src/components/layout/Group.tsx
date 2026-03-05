import React from "react";

import { cn } from "@/lib/utils";

interface GroupProps {
  children: React.ReactNode;
  className?: string;
  spacing?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  as?: React.ElementType;
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
}

/**
 * Group component provides consistent horizontal spacing between children
 * Uses space-x utilities for optimal performance
 */
export const Group: React.FC<GroupProps> = ({
  children,
  className = "",
  spacing = "md",
  as: Component = "div",
  align = "center",
  justify = "start",
  wrap = false,
}) => {
  const spacingClasses = {
    xs: "space-x-1",
    sm: "space-x-2",
    md: "space-x-4",
    lg: "space-x-6",
    xl: "space-x-8",
    "2xl": "space-x-12",
    "3xl": "space-x-16",
  };

  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    baseline: "items-baseline",
    stretch: "items-stretch",
  };

  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  const wrapClasses = wrap ? "flex-wrap" : "flex-nowrap";

  return (
    <Component
      className={cn(
        "flex",
        spacingClasses[spacing],
        alignClasses[align],
        justifyClasses[justify],
        wrapClasses,
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Group;
