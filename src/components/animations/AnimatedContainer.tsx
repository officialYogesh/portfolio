"use client";

import { motion, Variants, Transition } from "framer-motion";
import React, { useMemo, useState, useEffect } from "react";

import { useLoading } from "@/contexts/LoadingContext";

import {
  useScrollAnimation,
  useReducedMotion,
} from "../../lib/animations/hooks";

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade" | "slide" | "scale";
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  as?: React.ElementType; // This will determine the inner element type
}

/**
 * Optimized animated container component with scroll-triggered animations
 * Automatically handles reduced motion preferences and performance optimization
 */
export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  className = "",
  variant = "fade",
  direction = "up",
  delay = 0,
  duration = 0.4, // Reduced default duration for better performance
  threshold = 0.05, // Lower threshold for earlier triggering
  triggerOnce = true,
  as: InnerComponent = "div",
}) => {
  const { ref, isInView } = useScrollAnimation(threshold, triggerOnce);
  const { prefersReducedMotion, getDuration } = useReducedMotion();
  const { isLoading, isHydrated } = useLoading();
  const [componentReady, setComponentReady] = useState(false);

  // Determine if animation should be active
  const shouldAnimate = componentReady && isInView;

  // Wait for both hydration and loading to complete before starting animations
  useEffect(() => {
    if (isHydrated && !isLoading) {
      const timer = setTimeout(() => setComponentReady(true), 100);
      return () => clearTimeout(timer);
    } else {
      // Reset componentReady when loading starts or hydration is not complete
      setComponentReady(false);
    }
  }, [isHydrated, isLoading]);

  // Memoize animation variants to prevent unnecessary recalculations
  const animationVariants = useMemo((): Variants => {
    if (prefersReducedMotion) {
      // Return static variants for reduced motion
      return {
        hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
        visible: { opacity: 1, y: 0, x: 0, scale: 1 },
      };
    }

    const baseDuration = getDuration(duration);

    // Optimized transition with better performance settings
    const baseTransition: Transition = {
      type: "tween", // Use tween instead of spring for better performance
      duration: baseDuration,
      delay: delay * 0.5, // Reduce delay by half for faster sequence
      ease: [0.25, 0.46, 0.45, 0.94], // Optimized easing curve
    };

    // Reduced movement for better performance
    const optimizedMovement = 5; // Further reduced from 10

    const directionStyles: Record<string, { x?: number; y?: number }> = {
      up: { y: optimizedMovement },
      down: { y: -optimizedMovement },
      left: { x: optimizedMovement },
      right: { x: -optimizedMovement },
    };

    switch (variant) {
      case "slide":
        return {
          hidden: {
            opacity: 0,
            ...directionStyles[direction],
          },
          visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: baseTransition,
          },
        };

      case "scale":
        return {
          hidden: {
            opacity: 0,
            scale: 0.98, // Reduced scale change
          },
          visible: {
            opacity: 1,
            scale: 1,
            transition: baseTransition,
          },
        };

      case "fade":
      default:
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: baseTransition,
          },
        };
    }
  }, [variant, direction, delay, duration, getDuration, prefersReducedMotion]);

  // Early return for reduced motion
  if (prefersReducedMotion) {
    return (
      <InnerComponent ref={ref} className={className}>
        {children}
      </InnerComponent>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      variants={animationVariants}
      // Performance optimizations
      style={{ willChange: "transform, opacity" }}
    >
      <InnerComponent>{children}</InnerComponent>
    </motion.div>
  );
};

export default AnimatedContainer;
