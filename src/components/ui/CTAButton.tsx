"use client";

import { motion } from "framer-motion";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface CTAButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    | "onDrag"
    | "onDragEnd"
    | "onDragStart"
    | "onAnimationStart"
    | "onAnimationEnd"
  > {
  /**
   * Button content
   */
  children: React.ReactNode;
  /**
   * Button variant
   */
  variant?: "primary" | "secondary";
  /**
   * Button size
   */
  size?: "sm" | "default" | "lg";
  /**
   * Icon to display on the left side
   */
  icon?: React.ReactNode;
  /**
   * Icon to display on the right side
   */
  rightIcon?: React.ReactNode;
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;
  /**
   * Loading text to display when loading
   */
  loadingText?: string;
  /**
   * External link href - will open in new tab
   */
  href?: string;
  /**
   * Internal navigation path
   */
  to?: string;
  /**
   * Make button full width
   */
  fullWidth?: boolean;
}

/**
 * Main CTA Button Component
 *
 * Pill-shaped button for primary and secondary actions.
 * Uses theme-aware colors and supports all interaction patterns.
 */
export const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      children,
      icon,
      rightIcon,
      loading = false,
      loadingText = "Loading...",
      href,
      to,
      onClick,
      disabled,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;

      if (href) {
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }

      if (to) {
        window.location.href = to;
        return;
      }

      onClick?.(e);
    };

    const content = loading ? loadingText : children;
    const displayIcon = loading ? (
      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
    ) : (
      icon
    );

    const baseClasses = variant === "primary" ? "cta-primary" : "cta-secondary";
    const sizeClasses = {
      sm: "cta-sm",
      default: "",
      lg: "cta-lg",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseClasses,
          sizeClasses[size],
          fullWidth && "w-full",
          className
        )}
        onClick={handleClick}
        disabled={disabled || loading}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {displayIcon && (
          <span className="flex items-center justify-center">
            {displayIcon}
          </span>
        )}
        <span>{content}</span>
        {rightIcon && !loading && (
          <span className="flex items-center justify-center">{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

CTAButton.displayName = "CTAButton";

/**
 * Primary CTA Button Component
 *
 * High-contrast pill-shaped button for primary actions like "Download Resume", "Get Started", etc.
 * Uses primary theme color with white text for maximum visibility across all themes.
 */
export const PrimaryCTA = React.forwardRef<
  HTMLButtonElement,
  Omit<CTAButtonProps, "variant">
>((props, ref) => {
  return <CTAButton ref={ref} variant="primary" {...props} />;
});

PrimaryCTA.displayName = "PrimaryCTA";

/**
 * Secondary CTA Button Component
 *
 * Subtle pill-shaped button for secondary actions like "Learn More", "Contact", etc.
 * Uses theme-aware border and text colors that work across all themes.
 */
export const SecondaryCTA = React.forwardRef<
  HTMLButtonElement,
  Omit<CTAButtonProps, "variant">
>((props, ref) => {
  return <CTAButton ref={ref} variant="secondary" {...props} />;
});

SecondaryCTA.displayName = "SecondaryCTA";
