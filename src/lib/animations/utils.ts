/**
 * Animation utility functions and constants
 * Provides reusable animation helpers and configuration
 */

import { Variants, Transition, MotionValue } from "framer-motion";

// Animation timing constants
export const ANIMATION_DURATION = {
  INSTANT: 0,
  FAST: 0.15,
  NORMAL: 0.3,
  SLOW: 0.5,
  SLOWER: 0.8,
  SLOWEST: 1.2,
} as const;

// Easing curves
export const EASING = {
  EASE_OUT: [0.4, 0, 0.2, 1],
  EASE_IN: [0.4, 0, 1, 1],
  EASE_IN_OUT: [0.4, 0, 0.2, 1],
  BOUNCE: [0.68, -0.55, 0.265, 1.55],
  ANTICIPATE: [0.175, 0.885, 0.32, 1.275],
} as const;

// Spring configurations
export const SPRING_CONFIG = {
  GENTLE: { stiffness: 120, damping: 14 },
  MEDIUM: { stiffness: 260, damping: 20 },
  STIFF: { stiffness: 400, damping: 30 },
  BOUNCY: { stiffness: 600, damping: 15 },
} as const;

// Common delay patterns
export const STAGGER_DELAY = {
  FAST: 0.05,
  NORMAL: 0.1,
  SLOW: 0.2,
} as const;

/**
 * Create a fade animation variant
 */
export function createFadeVariant(
  duration: number = ANIMATION_DURATION.NORMAL,
  delay: number = 0
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: EASING.EASE_OUT,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: duration * 0.7,
        ease: EASING.EASE_IN,
      },
    },
  };
}

/**
 * Create a slide animation variant
 */
export function createSlideVariant(
  direction: "up" | "down" | "left" | "right",
  distance: number = 30,
  duration: number = ANIMATION_DURATION.NORMAL,
  delay: number = 0
): Variants {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
    }
  };

  const getExitPosition = () => {
    switch (direction) {
      case "up":
        return { y: -distance * 0.5, x: 0 };
      case "down":
        return { y: distance * 0.5, x: 0 };
      case "left":
        return { x: -distance * 0.5, y: 0 };
      case "right":
        return { x: distance * 0.5, y: 0 };
    }
  };

  return {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: EASING.EASE_OUT,
      },
    },
    exit: {
      opacity: 0,
      ...getExitPosition(),
      transition: {
        duration: duration * 0.7,
        ease: EASING.EASE_IN,
      },
    },
  };
}

/**
 * Create a scale animation variant
 */
export function createScaleVariant(
  initialScale: number = 0.8,
  duration: number = ANIMATION_DURATION.NORMAL,
  delay: number = 0,
  springConfig?: typeof SPRING_CONFIG.MEDIUM
): Variants {
  const transition = springConfig
    ? {
        type: "spring" as const,
        ...springConfig,
        delay,
      }
    : {
        duration,
        delay,
        ease: EASING.EASE_OUT,
      };

  return {
    hidden: {
      opacity: 0,
      scale: initialScale,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition,
    },
    exit: {
      opacity: 0,
      scale: initialScale * 1.1,
      transition: {
        duration: duration * 0.7,
        ease: EASING.EASE_IN,
      },
    },
  };
}

/**
 * Create a stagger container variant
 */
export function createStaggerContainer(
  staggerDelay: number = STAGGER_DELAY.NORMAL,
  delayChildren: number = 0
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: staggerDelay * 0.5,
        staggerDirection: -1,
      },
    },
  };
}

/**
 * Create hover animation variants
 */
export function createHoverVariant(
  scale: number = 1.05,
  duration: number = ANIMATION_DURATION.FAST
): Variants {
  return {
    rest: {
      scale: 1,
      transition: { duration, ease: EASING.EASE_OUT },
    },
    hover: {
      scale,
      transition: { duration, ease: EASING.EASE_OUT },
    },
    tap: {
      scale: scale * 0.95,
      transition: { duration: ANIMATION_DURATION.FAST, ease: EASING.EASE_OUT },
    },
  };
}

/**
 * Create rotation animation
 */
export function createRotateAnimation(
  duration: number = 1,
  clockwise: boolean = true
): Transition {
  return {
    rotate: clockwise ? 360 : -360,
    transition: {
      duration,
      repeat: Infinity,
      ease: "linear",
    },
  };
}

/**
 * Create a floating animation
 */
export function createFloatVariant(
  distance: number = 10,
  duration: number = 3
): Variants {
  return {
    animate: {
      y: [-distance, distance, -distance],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
}

/**
 * Create a pulsing animation
 */
export function createPulseVariant(
  minScale: number = 0.95,
  maxScale: number = 1.05,
  duration: number = 2
): Variants {
  return {
    animate: {
      scale: [minScale, maxScale, minScale],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
}

/**
 * Create typing cursor animation
 */
export function createCursorVariant(): Variants {
  return {
    blink: {
      opacity: [1, 0, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };
}

/**
 * Create path drawing animation for SVGs
 */
export function createPathDrawVariant(
  duration: number = 2,
  delay: number = 0
): Variants {
  return {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration,
          delay,
          ease: EASING.EASE_IN_OUT,
        },
        opacity: {
          duration: 0.3,
          delay,
        },
      },
    },
  };
}

/**
 * Create morphing animation between two states
 */
export function createMorphVariant(
  fromPath: string,
  toPath: string,
  duration: number = 1
): Variants {
  return {
    from: {
      d: fromPath,
      transition: { duration, ease: EASING.EASE_IN_OUT },
    },
    to: {
      d: toPath,
      transition: { duration, ease: EASING.EASE_IN_OUT },
    },
  };
}

/**
 * Calculate stagger delay for arrays
 */
export function calculateStaggerDelay(
  index: number,
  baseDelay: number = STAGGER_DELAY.NORMAL,
  maxDelay: number = 1
): number {
  return Math.min(index * baseDelay, maxDelay);
}

/**
 * Create responsive animation based on viewport size
 */
export function createResponsiveVariant(
  mobileVariant: Variants,
  desktopVariant: Variants,
  breakpoint: number = 768
): Variants {
  if (typeof window === "undefined") return desktopVariant;

  return window.innerWidth < breakpoint ? mobileVariant : desktopVariant;
}

/**
 * Combine multiple animation variants
 */
export function combineVariants(...variants: Variants[]): Variants {
  return variants.reduce((combined, variant) => {
    Object.keys(variant).forEach((key) => {
      if (combined[key]) {
        combined[key] = {
          ...combined[key],
          ...variant[key],
        };
      } else {
        combined[key] = variant[key];
      }
    });
    return combined;
  }, {});
}

/**
 * Create transition with reduced motion fallback
 */
export function createAccessibleTransition(
  normalTransition: Transition,
  prefersReducedMotion: boolean = false
): Transition {
  if (prefersReducedMotion) {
    return {
      duration: 0.01,
      ease: "linear",
    };
  }
  return normalTransition;
}

/**
 * Generate random animation delay for organic feel
 */
export function randomDelay(min: number = 0, max: number = 0.5): number {
  return Math.random() * (max - min) + min;
}

/**
 * Create elastic bounce animation
 */
export function createElasticVariant(
  scale: number = 1.2,
  duration: number = 0.6
): Variants {
  return {
    animate: {
      scale: [1, scale, 1],
      transition: {
        duration,
        ease: EASING.BOUNCE,
      },
    },
  };
}

/**
 * Get motion value spring animation
 */
export function animateMotionValue(
  motionValue: MotionValue<number>,
  to: number
): void {
  motionValue.set(to);
}
