import { Variants } from "framer-motion";

/**
 * Common animation variants for consistent motion design
 */

// Page transition variants
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Fade animation variants
export const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

// Slide animation variants
export const slideVariants: Variants = {
  hidden: (direction: "up" | "down" | "left" | "right" = "up") => ({
    opacity: 0,
    y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
    x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: (direction: "up" | "down" | "left" | "right" = "up") => ({
    opacity: 0,
    y: direction === "up" ? -30 : direction === "down" ? 30 : 0,
    x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

// Scale animation variants
export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Stagger container variants
export const staggerContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

// Stagger item variants
export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Morphing variants for illustrations
export const morphVariants: Variants = {
  initial: {
    pathLength: 0,
    opacity: 0,
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 2,
        ease: "easeInOut",
      },
      opacity: {
        duration: 0.3,
      },
    },
  },
};

// Bubble animation variants for tech stack
export const bubbleVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: Math.random() * 0.5,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 15,
    },
  },
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Card hover variants
export const cardHoverVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  tap: {
    scale: 0.98,
    y: 0,
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Loading spinner variants
export const spinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Parallax variants
export const parallaxVariants: Variants = {
  initial: {
    y: 0,
  },
  animate: (depth: number = 1) => ({
    y: -50 * depth,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

// Text reveal variants
export const textRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Navigation variants
export const navVariants: Variants = {
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Theme transition variants
export const themeTransitionVariants: Variants = {
  initial: {
    opacity: 0.8,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};
