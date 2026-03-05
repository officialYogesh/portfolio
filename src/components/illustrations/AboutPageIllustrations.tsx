"use client";

import { motion } from "framer-motion";
import React from "react";

// Task 5.3.1: Create SVG illustrations for about page

interface IllustrationProps {
  className?: string;
  animate?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

// Hero Illustration - Professional Developer at Work
export const HeroIllustration: React.FC<IllustrationProps> = ({
  className = "",
  animate = true,
  size = "lg",
}) => {
  const sizeMap = {
    sm: { width: 200, height: 200 },
    md: { width: 300, height: 300 },
    lg: { width: 400, height: 400 },
    xl: { width: 500, height: 500 },
  };

  const { width, height } = sizeMap[size];

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-all duration-300`}
      initial={animate ? { opacity: 0, scale: 0.8 } : false}
      animate={animate ? { opacity: 1, scale: 1 } : false}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background */}
      <motion.circle
        cx="200"
        cy="200"
        r="180"
        fill={`hsl(var(--primary) / 0.1)`}
        animate={
          animate
            ? {
                scale: [1, 1.05, 1],
              }
            : false
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Desk */}
      <motion.rect
        x="50"
        y="280"
        width="300"
        height="80"
        rx="10"
        fill={`hsl(var(--foreground) / 0.1)`}
        initial={animate ? { y: 300 } : false}
        animate={animate ? { y: 280 } : false}
        transition={{ delay: 0.3, duration: 0.6 }}
      />

      {/* Monitor */}
      <motion.rect
        x="120"
        y="200"
        width="160"
        height="100"
        rx="8"
        fill={`hsl(var(--card))`}
        stroke={`hsl(var(--border))`}
        strokeWidth="2"
        initial={animate ? { opacity: 0, y: 220 } : false}
        animate={animate ? { opacity: 1, y: 200 } : false}
        transition={{ delay: 0.5, duration: 0.6 }}
      />

      {/* Screen Content */}
      <motion.rect
        x="130"
        y="210"
        width="140"
        height="80"
        rx="4"
        fill={`hsl(var(--background))`}
        initial={animate ? { opacity: 0 } : false}
        animate={animate ? { opacity: 1 } : false}
        transition={{ delay: 0.7, duration: 0.6 }}
      />

      {/* Code Lines */}
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x="140"
          y={220 + i * 15}
          width={100 - i * 10}
          height="8"
          rx="2"
          fill={`hsl(var(--primary) / ${0.7 - i * 0.1})`}
          initial={animate ? { width: 0 } : false}
          animate={animate ? { width: 100 - i * 10 } : false}
          transition={{ delay: 0.9 + i * 0.1, duration: 0.4 }}
        />
      ))}

      {/* Monitor Stand */}
      <motion.rect
        x="190"
        y="300"
        width="20"
        height="20"
        fill={`hsl(var(--foreground) / 0.2)`}
        initial={animate ? { opacity: 0 } : false}
        animate={animate ? { opacity: 1 } : false}
        transition={{ delay: 0.4, duration: 0.6 }}
      />

      {/* Keyboard */}
      <motion.rect
        x="140"
        y="320"
        width="120"
        height="30"
        rx="4"
        fill={`hsl(var(--muted))`}
        initial={animate ? { opacity: 0, y: 340 } : false}
        animate={animate ? { opacity: 1, y: 320 } : false}
        transition={{ delay: 0.6, duration: 0.6 }}
      />

      {/* Coffee Cup */}
      <motion.circle
        cx="320"
        cy="320"
        r="15"
        fill={`hsl(var(--accent))`}
        initial={animate ? { scale: 0 } : false}
        animate={animate ? { scale: 1 } : false}
        transition={{ delay: 1.2, duration: 0.4, type: "spring" }}
      />

      {/* Steam from Coffee */}
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M${315 + i * 3} 305 Q${317 + i * 3} 295 ${315 + i * 3} 285`}
          stroke={`hsl(var(--muted))`}
          strokeWidth="2"
          fill="none"
          initial={animate ? { pathLength: 0, opacity: 0 } : false}
          animate={
            animate
              ? {
                  pathLength: 1,
                  opacity: [0, 0.6, 0],
                }
              : false
          }
          transition={{
            pathLength: { delay: 1.5 + i * 0.2, duration: 1 },
            opacity: {
              delay: 1.5 + i * 0.2,
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            },
          }}
        />
      ))}

      {/* Floating Elements */}
      <motion.circle
        cx="80"
        cy="120"
        r="8"
        fill={`hsl(var(--secondary) / 0.6)`}
        animate={
          animate
            ? {
                y: [-5, 5, -5],
                opacity: [0.4, 0.8, 0.4],
              }
            : false
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.circle
        cx="320"
        cy="100"
        r="6"
        fill={`hsl(var(--accent) / 0.6)`}
        animate={
          animate
            ? {
                y: [5, -5, 5],
                opacity: [0.3, 0.7, 0.3],
              }
            : false
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </motion.svg>
  );
};

// Journey Illustration with career path visualization
export const JourneyIllustration: React.FC<IllustrationProps> = ({
  className = "",
  animate = true,
  size = "md",
}) => {
  const sizeMap = {
    sm: { width: 200, height: 100 },
    md: { width: 300, height: 150 },
    lg: { width: 400, height: 200 },
    xl: { width: 500, height: 250 },
  };

  const { width, height } = sizeMap[size];

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 300 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={animate ? { opacity: 0 } : false}
      animate={animate ? { opacity: 1 } : false}
      transition={{ duration: 1 }}
    >
      {/* Path */}
      <motion.path
        d="M20 120 Q80 60 150 80 T280 40"
        stroke={`hsl(var(--primary))`}
        strokeWidth="3"
        fill="none"
        strokeDasharray="5,5"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : false}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Milestones */}
      {[
        { x: 20, y: 120, label: "Start" },
        { x: 100, y: 70, label: "Learn" },
        { x: 200, y: 85, label: "Grow" },
        { x: 280, y: 40, label: "Excel" },
      ].map((milestone, i) => (
        <motion.g key={i}>
          <motion.circle
            cx={milestone.x}
            cy={milestone.y}
            r="8"
            fill={`hsl(var(--primary))`}
            initial={animate ? { scale: 0 } : false}
            animate={animate ? { scale: 1 } : false}
            transition={{ delay: i * 0.3, duration: 0.4, type: "spring" }}
          />
          <motion.text
            x={milestone.x}
            y={milestone.y - 15}
            textAnchor="middle"
            fill={`hsl(var(--foreground))`}
            fontSize="12"
            fontWeight="500"
            initial={animate ? { opacity: 0, y: milestone.y - 10 } : false}
            animate={animate ? { opacity: 1, y: milestone.y - 15 } : false}
            transition={{ delay: i * 0.3 + 0.2, duration: 0.4 }}
          >
            {milestone.label}
          </motion.text>
        </motion.g>
      ))}
    </motion.svg>
  );
};

// Timeline Decoration
export const TimelineDecoration: React.FC<{
  className?: string;
  position: "left" | "right";
}> = ({ className = "", position }) => {
  return (
    <motion.svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ rotate: position === "left" ? -10 : 10, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.circle
        cx="30"
        cy="30"
        r="25"
        stroke={`hsl(var(--primary) / 0.3)`}
        strokeWidth="2"
        fill="none"
        strokeDasharray="4,4"
        animate={{
          rotate: position === "left" ? 360 : -360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.circle
        cx="30"
        cy="30"
        r="15"
        fill={`hsl(var(--primary) / 0.1)`}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.circle cx="30" cy="30" r="8" fill={`hsl(var(--primary))`} />
    </motion.svg>
  );
};

// Philosophy Icon Illustrations
export const PhilosophyIcon: React.FC<{
  type: "code" | "team" | "learn" | "solve";
  className?: string;
  animate?: boolean;
}> = ({ type, className = "", animate = true }) => {
  const icons = {
    code: (
      <motion.svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        initial={animate ? { scale: 0, rotate: -180 } : false}
        animate={animate ? { scale: 1, rotate: 0 } : false}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <motion.rect
          x="4"
          y="8"
          width="40"
          height="32"
          rx="4"
          stroke={`hsl(var(--primary))`}
          strokeWidth="2"
          fill={`hsl(var(--primary) / 0.1)`}
        />
        <motion.path
          d="M14 18 L18 22 L14 26"
          stroke={`hsl(var(--primary))`}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animate ? { pathLength: 0 } : false}
          animate={animate ? { pathLength: 1 } : false}
          transition={{ delay: 0.3, duration: 0.6 }}
        />
        <motion.path
          d="M22 26 L34 26"
          stroke={`hsl(var(--primary))`}
          strokeWidth="2"
          strokeLinecap="round"
          initial={animate ? { pathLength: 0 } : false}
          animate={animate ? { pathLength: 1 } : false}
          transition={{ delay: 0.5, duration: 0.4 }}
        />
      </motion.svg>
    ),
    team: (
      <motion.svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        initial={animate ? { scale: 0 } : false}
        animate={animate ? { scale: 1 } : false}
        transition={{ duration: 0.6, type: "spring" }}
      >
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={16 + i * 8}
            cy="20"
            r="6"
            fill={`hsl(var(--primary))`}
            initial={animate ? { scale: 0 } : false}
            animate={animate ? { scale: 1 } : false}
            transition={{ delay: i * 0.1, duration: 0.4, type: "spring" }}
          />
        ))}
        <motion.path
          d="M8 36 Q24 28 40 36"
          stroke={`hsl(var(--primary))`}
          strokeWidth="2"
          fill="none"
          initial={animate ? { pathLength: 0 } : false}
          animate={animate ? { pathLength: 1 } : false}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
      </motion.svg>
    ),
    learn: (
      <motion.svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        initial={animate ? { scale: 0, rotate: 45 } : false}
        animate={animate ? { scale: 1, rotate: 0 } : false}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <motion.path
          d="M12 16 L24 8 L36 16 L24 24 L12 16 Z"
          stroke={`hsl(var(--primary))`}
          strokeWidth="2"
          fill={`hsl(var(--primary) / 0.1)`}
          initial={animate ? { pathLength: 0 } : false}
          animate={animate ? { pathLength: 1 } : false}
          transition={{ delay: 0.2, duration: 0.8 }}
        />
        <motion.path
          d="M12 24 L24 32 L36 24"
          stroke={`hsl(var(--primary))`}
          strokeWidth="2"
          fill="none"
          initial={animate ? { pathLength: 0 } : false}
          animate={animate ? { pathLength: 1 } : false}
          transition={{ delay: 0.6, duration: 0.6 }}
        />
        <motion.path
          d="M12 32 L24 40 L36 32"
          stroke={`hsl(var(--primary))`}
          strokeWidth="2"
          fill="none"
          initial={animate ? { pathLength: 0 } : false}
          animate={animate ? { pathLength: 1 } : false}
          transition={{ delay: 0.8, duration: 0.6 }}
        />
      </motion.svg>
    ),
    solve: (
      <motion.svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        initial={animate ? { scale: 0 } : false}
        animate={animate ? { scale: 1 } : false}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <motion.circle
          cx="24"
          cy="24"
          r="18"
          stroke={`hsl(var(--primary))`}
          strokeWidth="2"
          fill={`hsl(var(--primary) / 0.1)`}
          initial={animate ? { scale: 0 } : false}
          animate={animate ? { scale: 1 } : false}
          transition={{ duration: 0.6 }}
        />
        <motion.path
          d="M18 24 L22 28 L30 16"
          stroke={`hsl(var(--primary))`}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animate ? { pathLength: 0 } : false}
          animate={animate ? { pathLength: 1 } : false}
          transition={{ delay: 0.4, duration: 0.6 }}
        />
      </motion.svg>
    ),
  };

  return icons[type];
};

// Background Pattern
export const BackgroundPattern: React.FC<{
  className?: string;
  density?: "low" | "medium" | "high";
}> = ({ className = "", density = "medium" }) => {
  const densityMap = {
    low: 40,
    medium: 25,
    high: 15,
  };

  const spacing = densityMap[density];

  return (
    <motion.svg
      className={`absolute inset-0 ${className}`}
      style={{ zIndex: -1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 2 }}
    >
      <defs>
        <pattern
          id="grid-pattern"
          x="0"
          y="0"
          width={spacing}
          height={spacing}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={spacing / 2}
            cy={spacing / 2}
            r="1"
            fill={`hsl(var(--primary))`}
            opacity="0.2"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </motion.svg>
  );
};

// Section Divider Illustration
export const SectionDivider: React.FC<{
  className?: string;
  variant?: "wave" | "dots" | "line";
}> = ({ className = "", variant = "wave" }) => {
  const variants = {
    wave: (
      <motion.svg
        width="100%"
        height="60"
        viewBox="0 0 400 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.path
          d="M0 30 Q100 10 200 30 T400 30"
          stroke={`hsl(var(--primary) / 0.3)`}
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </motion.svg>
    ),
    dots: (
      <motion.div className={`flex justify-center space-x-2 ${className}`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: `hsl(var(--primary))` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          />
        ))}
      </motion.div>
    ),
    line: (
      <motion.div
        className={`w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent ${className}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5 }}
      />
    ),
  };

  return variants[variant];
};

export const TravelIllustration: React.FC<IllustrationProps> = ({
  className = "",
  animate = true,
  size = "md",
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-16 h-16";
      case "md":
        return "w-24 h-24";
      case "lg":
        return "w-32 h-32";
      case "xl":
        return "w-48 h-48";
      default:
        return "w-24 h-24";
    }
  };

  return (
    <motion.svg
      className={`${getSizeClasses()} ${className}`}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={animate ? { opacity: 0, scale: 0.8 } : false}
      animate={animate ? { opacity: 1, scale: 1 } : false}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Globe */}
      <motion.circle
        cx="200"
        cy="200"
        r="120"
        stroke="hsl(var(--primary))"
        strokeWidth="3"
        fill="hsl(var(--primary) / 0.1)"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : false}
        transition={{ duration: 2, delay: 0.2 }}
      />

      {/* Latitude lines */}
      <motion.ellipse
        cx="200"
        cy="200"
        rx="120"
        ry="40"
        stroke="hsl(var(--accent))"
        strokeWidth="2"
        fill="none"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : false}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      <motion.ellipse
        cx="200"
        cy="200"
        rx="120"
        ry="80"
        stroke="hsl(var(--accent))"
        strokeWidth="2"
        fill="none"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : false}
        transition={{ duration: 1.5, delay: 0.6 }}
      />

      {/* Longitude lines */}
      <motion.ellipse
        cx="200"
        cy="200"
        rx="40"
        ry="120"
        stroke="hsl(var(--accent))"
        strokeWidth="2"
        fill="none"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : false}
        transition={{ duration: 1.5, delay: 0.7 }}
      />
      <motion.ellipse
        cx="200"
        cy="200"
        rx="80"
        ry="120"
        stroke="hsl(var(--accent))"
        strokeWidth="2"
        fill="none"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : false}
        transition={{ duration: 1.5, delay: 0.8 }}
      />

      {/* Travel markers */}
      <motion.circle
        cx="150"
        cy="160"
        r="6"
        fill="hsl(var(--primary))"
        initial={animate ? { scale: 0 } : false}
        animate={animate ? { scale: 1 } : false}
        transition={{ duration: 0.3, delay: 1.2 }}
      />
      <motion.circle
        cx="250"
        cy="180"
        r="6"
        fill="hsl(var(--primary))"
        initial={animate ? { scale: 0 } : false}
        animate={animate ? { scale: 1 } : false}
        transition={{ duration: 0.3, delay: 1.4 }}
      />
      <motion.circle
        cx="180"
        cy="240"
        r="6"
        fill="hsl(var(--primary))"
        initial={animate ? { scale: 0 } : false}
        animate={animate ? { scale: 1 } : false}
        transition={{ duration: 0.3, delay: 1.6 }}
      />

      {/* Flight path */}
      <motion.path
        d="M150 160 Q200 120 250 180 Q220 220 180 240"
        stroke="hsl(var(--secondary))"
        strokeWidth="2"
        strokeDasharray="5,5"
        fill="none"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : false}
        transition={{ duration: 2, delay: 1.8 }}
      />
    </motion.svg>
  );
};

export const CitySkylinesIllustration: React.FC<IllustrationProps> = ({
  className = "",
  animate = true,
  size = "lg",
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-32 h-16";
      case "md":
        return "w-48 h-24";
      case "lg":
        return "w-64 h-32";
      case "xl":
        return "w-96 h-48";
      default:
        return "w-64 h-32";
    }
  };

  return (
    <motion.svg
      className={`${getSizeClasses()} ${className}`}
      viewBox="0 0 800 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Mumbai skyline */}
      <motion.g
        initial={animate ? { x: -50, opacity: 0 } : false}
        animate={animate ? { x: 0, opacity: 1 } : false}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <rect
          x="50"
          y="200"
          width="30"
          height="180"
          fill="hsl(var(--primary) / 0.7)"
        />
        <rect
          x="90"
          y="150"
          width="25"
          height="230"
          fill="hsl(var(--primary) / 0.8)"
        />
        <rect
          x="125"
          y="180"
          width="35"
          height="200"
          fill="hsl(var(--primary) / 0.6)"
        />
        <rect
          x="170"
          y="120"
          width="28"
          height="260"
          fill="hsl(var(--primary) / 0.9)"
        />
      </motion.g>

      {/* NYC skyline */}
      <motion.g
        initial={animate ? { x: 0, opacity: 0 } : false}
        animate={animate ? { x: 0, opacity: 1 } : false}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <rect
          x="300"
          y="100"
          width="40"
          height="280"
          fill="hsl(var(--secondary) / 0.8)"
        />
        <rect
          x="350"
          y="80"
          width="35"
          height="300"
          fill="hsl(var(--secondary) / 0.9)"
        />
        <rect
          x="395"
          y="120"
          width="30"
          height="260"
          fill="hsl(var(--secondary) / 0.7)"
        />
        <rect
          x="435"
          y="90"
          width="25"
          height="290"
          fill="hsl(var(--secondary) / 0.6)"
        />
      </motion.g>

      {/* Boston/Syracuse skyline */}
      <motion.g
        initial={animate ? { x: 50, opacity: 0 } : false}
        animate={animate ? { x: 0, opacity: 1 } : false}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <rect
          x="600"
          y="180"
          width="25"
          height="200"
          fill="hsl(var(--accent) / 0.7)"
        />
        <rect
          x="635"
          y="160"
          width="30"
          height="220"
          fill="hsl(var(--accent) / 0.8)"
        />
        <rect
          x="675"
          y="140"
          width="35"
          height="240"
          fill="hsl(var(--accent) / 0.6)"
        />
        <rect
          x="720"
          y="170"
          width="28"
          height="210"
          fill="hsl(var(--accent) / 0.9)"
        />
      </motion.g>

      {/* Connection lines */}
      <motion.path
        d="M200 250 Q350 200 300 250"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        strokeDasharray="3,3"
        fill="none"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : false}
        transition={{ duration: 1.5, delay: 1.2 }}
      />
      <motion.path
        d="M460 250 Q550 200 600 250"
        stroke="hsl(var(--secondary))"
        strokeWidth="2"
        strokeDasharray="3,3"
        fill="none"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : false}
        transition={{ duration: 1.5, delay: 1.5 }}
      />
    </motion.svg>
  );
};
