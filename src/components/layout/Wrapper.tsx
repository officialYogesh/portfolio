import React from "react";

import { cn } from "@/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "section" | "hero" | "card" | "sidebar" | "content";
  as?: React.ElementType;
  fullHeight?: boolean;
  centered?: boolean;
}

/**
 * Wrapper component provides flexible layout patterns
 * Used for different content sections and layout structures
 */
export const Wrapper: React.FC<WrapperProps> = ({
  children,
  className = "",
  variant = "default",
  as: Component = "div",
  fullHeight = false,
  centered = false,
}) => {
  const variantClasses = {
    default: "w-full",
    section: "py-12 lg:py-16",
    hero: "py-20 lg:py-32 min-h-screen flex items-center",
    card: "bg-card border border-border rounded-lg p-6 shadow-sm",
    sidebar: "w-full lg:w-80 flex-shrink-0",
    content: "flex-1 min-w-0",
  };

  const heightClasses = fullHeight ? "min-h-screen" : "";
  const centerClasses = centered ? "flex items-center justify-center" : "";

  return (
    <Component
      className={cn(
        variantClasses[variant],
        heightClasses,
        centerClasses,
        className
      )}
    >
      {children}
    </Component>
  );
};

/**
 * Section wrapper for consistent page sections
 */
export const Section: React.FC<Omit<WrapperProps, "variant">> = (props) => (
  <Wrapper variant="section" {...props} />
);

/**
 * Hero wrapper for landing sections
 */
export const Hero: React.FC<Omit<WrapperProps, "variant">> = (props) => (
  <Wrapper variant="hero" {...props} />
);

/**
 * Card wrapper for content cards
 */
export const Card: React.FC<Omit<WrapperProps, "variant">> = (props) => (
  <Wrapper variant="card" {...props} />
);

/**
 * Main content area wrapper
 */
export const Main: React.FC<WrapperProps> = ({
  children,
  className = "",
  ...props
}) => (
  <Wrapper
    as="main"
    className={cn("flex-1 overflow-hidden", className)}
    {...props}
  >
    {children}
  </Wrapper>
);

export default Wrapper;
