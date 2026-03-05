import React from "react";

import { cn } from "@/lib/utils";

interface StackProps {
  children: React.ReactNode;
  className?: string;
  spacing?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  as?: React.ElementType;
  align?: "start" | "center" | "end" | "stretch";
}

/**
 * Stack component provides consistent vertical spacing between children
 * Uses space-y utilities for optimal performance
 */
export const Stack: React.FC<StackProps> = ({
  children,
  className = "",
  spacing = "md",
  as: Component = "div",
  align = "stretch",
}) => {
  const spacingClasses = {
    xs: "space-y-1",
    sm: "space-y-2",
    md: "space-y-4",
    lg: "space-y-6",
    xl: "space-y-8",
    "2xl": "space-y-12",
    "3xl": "space-y-16",
  };

  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  return (
    <Component
      className={cn(
        "flex flex-col",
        spacingClasses[spacing],
        alignClasses[align],
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Stack;
