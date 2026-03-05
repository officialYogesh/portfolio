"use client";

import {
  motion,
  useReducedMotion,
  LazyMotion,
  domAnimation,
} from "framer-motion";
import { useInView } from "framer-motion";
import React, { useMemo, useCallback } from "react";

// Task 5.3.3: Add page-specific graphic elements
// Task 5.3.4: Optimize illustrations for performance and accessibility

interface GraphicElementProps {
  className?: string;
  reducedMotion?: boolean;
  ariaLabel?: string;
  role?: string;
}

// Performance optimized component wrapper
const OptimizedGraphic: React.FC<{
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  role?: string;
  lazy?: boolean;
}> = ({ children, className = "", ariaLabel, role = "img", lazy = true }) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });

  // Lazy load graphics only when in view
  if (lazy && !isInView) {
    return (
      <div
        ref={ref}
        className={`${className} min-h-[200px]`}
        aria-label={ariaLabel}
        role={role}
      />
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        ref={ref}
        className={className}
        aria-label={ariaLabel}
        role={role}
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={shouldReduceMotion ? false : { opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
        style={{
          willChange: shouldReduceMotion ? "auto" : "transform",
        }}
      >
        {children}
      </motion.div>
    </LazyMotion>
  );
};

// About page hero graphic
export const AboutHeroGraphic: React.FC<GraphicElementProps> = ({
  className = "",
  ariaLabel = "Professional developer workspace illustration",
}) => {
  const shouldReduceMotion = useReducedMotion();

  const codeLines = useMemo(
    () => [
      { width: "80%", delay: 0.5 },
      { width: "65%", delay: 0.7 },
      { width: "90%", delay: 0.9 },
      { width: "70%", delay: 1.1 },
      { width: "85%", delay: 1.3 },
    ],
    []
  );

  return (
    <OptimizedGraphic className={className} ariaLabel={ariaLabel} role="img">
      <svg
        width="400"
        height="300"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-md mx-auto"
        aria-hidden="true"
      >
        {/* Workspace background */}
        <motion.rect
          x="20"
          y="200"
          width="360"
          height="80"
          rx="8"
          fill="hsl(var(--card))"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          initial={shouldReduceMotion ? false : { y: 220, opacity: 0 }}
          animate={shouldReduceMotion ? false : { y: 200, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        {/* Multiple monitors */}
        {[0, 1].map((i) => (
          <motion.g key={i}>
            <motion.rect
              x={60 + i * 180}
              y="80"
              width="140"
              height="100"
              rx="6"
              fill="hsl(var(--background))"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
              animate={shouldReduceMotion ? false : { scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.2,
                type: "spring",
                stiffness: 200,
              }}
            />

            {/* Screen content */}
            <motion.rect
              x={70 + i * 180}
              y="90"
              width="120"
              height="80"
              rx="3"
              fill="hsl(var(--muted) / 0.1)"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={shouldReduceMotion ? false : { opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.2 }}
            />

            {/* Code lines */}
            {codeLines.slice(0, 4).map((line, j) => (
              <motion.rect
                key={j}
                x={80 + i * 180}
                y={100 + j * 12}
                width="0"
                height="6"
                rx="2"
                fill={`hsl(var(--primary) / ${0.8 - j * 0.1})`}
                animate={
                  shouldReduceMotion
                    ? { width: `calc(${line.width} * 100px / 100)` }
                    : {
                        width: `calc(${line.width} * 100px / 100)`,
                      }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.8,
                  delay: shouldReduceMotion ? 0 : line.delay + i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.g>
        ))}

        {/* Floating elements */}
        <motion.circle
          cx="320"
          cy="60"
          r="8"
          fill="hsl(var(--accent) / 0.6)"
          animate={
            shouldReduceMotion
              ? false
              : {
                  y: [0, -10, 0],
                  opacity: [0.4, 0.8, 0.4],
                }
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 3,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.circle
          cx="80"
          cy="40"
          r="6"
          fill="hsl(var(--secondary) / 0.6)"
          animate={
            shouldReduceMotion
              ? false
              : {
                  y: [0, 8, 0],
                  opacity: [0.3, 0.7, 0.3],
                }
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 4,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Decorative lines */}
        <motion.path
          d="M50 50 Q200 30 350 50"
          stroke="hsl(var(--primary) / 0.3)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
          initial={shouldReduceMotion ? false : { pathLength: 0 }}
          animate={shouldReduceMotion ? false : { pathLength: 1 }}
          transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
        />
      </svg>
    </OptimizedGraphic>
  );
};

// Skills section background pattern
export const SkillsPatternGraphic: React.FC<GraphicElementProps> = ({
  className = "",
  ariaLabel = "Skills background pattern",
}) => {
  const shouldReduceMotion = useReducedMotion();

  const patterns = useMemo(() => {
    const items = [];
    for (let i = 0; i < 20; i++) {
      items.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 2,
      });
    }
    return items;
  }, []);

  return (
    <OptimizedGraphic
      className={`absolute inset-0 overflow-hidden ${className}`}
      ariaLabel={ariaLabel}
      role="presentation"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="skills-pattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            {patterns.slice(0, 8).map((dot, i) => (
              <motion.circle
                key={i}
                cx={dot.x % 20}
                cy={dot.y % 20}
                r={dot.size / 2}
                fill="hsl(var(--primary))"
                opacity="0.1"
                animate={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: [0.05, 0.2, 0.05],
                        scale: [1, 1.2, 1],
                      }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 4,
                  repeat: shouldReduceMotion ? 0 : Infinity,
                  delay: shouldReduceMotion ? 0 : dot.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#skills-pattern)" />
      </svg>
    </OptimizedGraphic>
  );
};

// Timeline connector graphic
export const TimelineConnectorGraphic: React.FC<{
  className?: string;
  direction?: "up" | "down";
  ariaLabel?: string;
}> = ({
  className = "",
  direction = "down",
  ariaLabel = "Timeline connection indicator",
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <OptimizedGraphic
      className={className}
      ariaLabel={ariaLabel}
      role="presentation"
    >
      <svg
        width="60"
        height="100"
        viewBox="0 0 60 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-hidden="true"
      >
        {/* Main timeline line */}
        <motion.line
          x1="30"
          y1="0"
          x2="30"
          y2="100"
          stroke="hsl(var(--border))"
          strokeWidth="2"
          strokeDasharray="4,4"
          initial={shouldReduceMotion ? false : { pathLength: 0 }}
          animate={shouldReduceMotion ? false : { pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Direction indicator */}
        <motion.polygon
          points={
            direction === "down" ? "25,85 30,95 35,85" : "25,15 30,5 35,15"
          }
          fill="hsl(var(--primary))"
          initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
          animate={shouldReduceMotion ? false : { scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 1.2,
            type: "spring",
            stiffness: 200,
          }}
        />

        {/* Decorative elements */}
        {[20, 50, 80].map((y, i) => (
          <motion.circle
            key={i}
            cx="30"
            cy={y}
            r="3"
            fill="hsl(var(--primary) / 0.3)"
            initial={shouldReduceMotion ? false : { scale: 0 }}
            animate={shouldReduceMotion ? false : { scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.5 + i * 0.2,
              type: "spring",
            }}
          />
        ))}
      </svg>
    </OptimizedGraphic>
  );
};

// Section separator graphic
export const SectionSeparatorGraphic: React.FC<{
  className?: string;
  variant?: "wave" | "dots" | "geometric";
  ariaLabel?: string;
}> = ({
  className = "",
  variant = "wave",
  ariaLabel = "Section separator decoration",
}) => {
  const shouldReduceMotion = useReducedMotion();

  const renderVariant = useCallback(() => {
    switch (variant) {
      case "wave":
        return (
          <motion.path
            d="M0 20 Q50 5 100 20 T200 20"
            stroke="hsl(var(--primary) / 0.4)"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
            initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={shouldReduceMotion ? false : { pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        );

      case "dots":
        return (
          <>
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.circle
                key={i}
                cx={40 + i * 30}
                cy="20"
                r="3"
                fill="hsl(var(--primary))"
                initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
                animate={
                  shouldReduceMotion ? false : { scale: 1, opacity: 0.6 }
                }
                transition={{
                  duration: 0.4,
                  delay: shouldReduceMotion ? 0 : i * 0.1,
                  type: "spring",
                }}
              />
            ))}
          </>
        );

      case "geometric":
        return (
          <>
            {[0, 1, 2].map((i) => (
              <motion.polygon
                key={i}
                points={`${60 + i * 40},10 ${70 + i * 40},30 ${50 + i * 40},30`}
                fill="hsl(var(--primary) / 0.3)"
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        scale: 0,
                        rotate: -180,
                        opacity: 0,
                      }
                }
                animate={
                  shouldReduceMotion
                    ? false
                    : {
                        scale: 1,
                        rotate: 0,
                        opacity: 1,
                      }
                }
                transition={{
                  duration: 0.6,
                  delay: shouldReduceMotion ? 0 : i * 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
              />
            ))}
          </>
        );

      default:
        return null;
    }
  }, [variant, shouldReduceMotion]);

  return (
    <OptimizedGraphic
      className={className}
      ariaLabel={ariaLabel}
      role="presentation"
    >
      <svg
        width="100%"
        height="40"
        viewBox="0 0 200 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {renderVariant()}
      </svg>
    </OptimizedGraphic>
  );
};

// Interactive floating elements
export const FloatingElementsGraphic: React.FC<{
  className?: string;
  density?: "low" | "medium" | "high";
  ariaLabel?: string;
}> = ({
  className = "",
  density = "medium",
  ariaLabel = "Decorative floating elements",
}) => {
  const shouldReduceMotion = useReducedMotion();

  const elements = useMemo(() => {
    const counts = { low: 3, medium: 6, high: 9 };
    const count = counts[density];

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 10 + (80 / count) * i + Math.random() * 10,
      y: 10 + Math.random() * 80,
      size: 4 + Math.random() * 8,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4,
    }));
  }, [density]);

  if (shouldReduceMotion) {
    return (
      <div
        className={`absolute inset-0 pointer-events-none ${className}`}
        aria-label={ariaLabel}
        role="presentation"
      >
        <div className="opacity-20">
          {elements.map((el) => (
            <div
              key={el.id}
              className="absolute rounded-full bg-primary"
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                width: `${el.size}px`,
                height: `${el.size}px`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <OptimizedGraphic
      className={`absolute inset-0 pointer-events-none ${className}`}
      ariaLabel={ariaLabel}
      role="presentation"
    >
      <div className="relative w-full h-full">
        {elements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute rounded-full bg-primary opacity-20"
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              width: `${el.size}px`,
              height: `${el.size}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </OptimizedGraphic>
  );
};

// Philosophy card background
export const PhilosophyBackgroundGraphic: React.FC<{
  className?: string;
  type: "code" | "team" | "learn" | "solve";
  ariaLabel?: string;
}> = ({
  className = "",
  type,
  ariaLabel = `${type} philosophy background decoration`,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const patterns = {
    code: "M10 10 L90 10 M10 20 L70 20 M10 30 L80 30 M10 40 L60 40",
    team: "M20 20 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0 M50 20 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0 M80 20 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0",
    learn: "M50 10 L20 30 L50 50 L80 30 Z",
    solve:
      "M50 50 m-30,0 a30,30 0 1,0 60,0 a30,30 0 1,0 -60,0 M35 50 L45 60 L65 40",
  };

  return (
    <OptimizedGraphic
      className={`absolute inset-0 overflow-hidden ${className}`}
      ariaLabel={ariaLabel}
      role="presentation"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 opacity-10"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <motion.path
          d={patterns[type]}
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={shouldReduceMotion ? false : { pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
      </svg>
    </OptimizedGraphic>
  );
};
