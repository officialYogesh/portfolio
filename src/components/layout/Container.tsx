import React from "react";

import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  as?: React.ElementType;
  noPadding?: boolean;
}

/**
 * Container component provides consistent width constraints and spacing
 * Implements mobile-first responsive design with configurable sizes
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  size = "xl",
  as: Component = "div",
  noPadding = false,
}) => {
  const sizeClasses = {
    sm: "max-w-screen-sm", // 640px
    md: "max-w-screen-md", // 768px
    lg: "max-w-screen-lg", // 1024px
    xl: "max-w-screen-xl", // 1280px
    "2xl": "max-w-screen-2xl", // 1536px
    full: "max-w-full",
  };

  const paddingClasses = noPadding ? "" : "px-4 sm:px-6 lg:px-8";

  return (
    <Component
      className={cn(
        "w-full mx-auto",
        sizeClasses[size],
        paddingClasses,
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Container;
