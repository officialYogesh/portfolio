"use client";

import { motion, useReducedMotion } from "framer-motion";
import React, { useMemo, useEffect, useState } from "react";

import { useTheme } from "../../contexts/ThemeContext";

// Task 5.3.5: Create responsive illustration scaling
// Task 5.3.6: Add theme-appropriate illustration variations

// Type definitions
type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ResponsiveIllustrationProps {
  className?: string;
  variant?: "minimal" | "detailed" | "complex";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "responsive";
  themeAdaptive?: boolean;
}

// Responsive sizing hook
const useResponsiveSize = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>("md");

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 480) setScreenSize("xs");
      else if (width < 768) setScreenSize("sm");
      else if (width < 1024) setScreenSize("md");
      else if (width < 1440) setScreenSize("lg");
      else setScreenSize("xl");
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const dimensionMap: Record<ScreenSize, { width: number; height: number }> = {
    xs: { width: 160, height: 120 },
    sm: { width: 220, height: 165 },
    md: { width: 300, height: 225 },
    lg: { width: 380, height: 285 },
    xl: { width: 460, height: 345 },
  };

  const dimensions = dimensionMap[screenSize];

  return {
    dimensions,
    screenSize,
    isMobile: screenSize === "xs" || screenSize === "sm",
    isTablet: screenSize === "md",
    isDesktop: screenSize === "lg" || screenSize === "xl",
  };
};

// Hook for theme-specific variations
const useThemeVariations = () => {
  const { currentTheme } = useTheme();

  const themeConfigs = useMemo(
    (): Record<
      string,
      {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        complexity: string;
        style: string;
      }
    > => ({
      dracula: {
        primary: "#bd93f9",
        secondary: "#ff79c6",
        accent: "#50fa7b",
        background: "#282a36",
        complexity: "complex",
        style: "vibrant",
      },
      "one-dark": {
        primary: "#61afef",
        secondary: "#e06c75",
        accent: "#98c379",
        background: "#282c34",
        complexity: "detailed",
        style: "modern",
      },
      nord: {
        primary: "#88c0d0",
        secondary: "#81a1c1",
        accent: "#a3be8c",
        background: "#2e3440",
        complexity: "minimal",
        style: "clean",
      },
      gruvbox: {
        primary: "#83a598",
        secondary: "#fabd2f",
        accent: "#b8bb26",
        background: "#282828",
        complexity: "detailed",
        style: "warm",
      },
      "solarized-dark": {
        primary: "#268bd2",
        secondary: "#2aa198",
        accent: "#859900",
        background: "#002b36",
        complexity: "minimal",
        style: "professional",
      },
      horizon: {
        primary: "#e95678",
        secondary: "#fab795",
        accent: "#29d398",
        background: "#1c1e26",
        complexity: "complex",
        style: "gradient",
      },
      palenight: {
        primary: "#c792ea",
        secondary: "#f78c6c",
        accent: "#82aaff",
        background: "#292d3e",
        complexity: "detailed",
        style: "soft",
      },
    }),
    []
  );

  return (
    themeConfigs[currentTheme as keyof typeof themeConfigs] ||
    themeConfigs.dracula
  );
};

// Responsive Hero Illustration with theme adaptation
export const ResponsiveHeroIllustration: React.FC<
  ResponsiveIllustrationProps
> = ({
  className = "",
  variant = "detailed",
  size = "responsive",
  themeAdaptive = true,
}) => {
  const { dimensions, isMobile } = useResponsiveSize();
  const themeConfig = useThemeVariations();
  const shouldReduceMotion = useReducedMotion();

  const finalDimensions =
    size === "responsive"
      ? dimensions
      : {
          xs: { width: 160, height: 120 },
          sm: { width: 220, height: 165 },
          md: { width: 300, height: 225 },
          lg: { width: 380, height: 285 },
          xl: { width: 460, height: 345 },
        }[size] || dimensions;

  // Adjust complexity based on screen size and theme
  const effectiveVariant = useMemo(() => {
    if (isMobile) return "minimal";
    if (themeAdaptive && themeConfig.complexity === "minimal") return "minimal";
    return variant;
  }, [isMobile, themeAdaptive, themeConfig.complexity, variant]);

  const renderVariant = () => {
    const baseElements = (
      <>
        {/* Desk */}
        <motion.rect
          x="20"
          y={finalDimensions.height * 0.7}
          width={finalDimensions.width - 40}
          height={finalDimensions.height * 0.25}
          rx="8"
          fill={
            themeAdaptive ? `${themeConfig.background}40` : "hsl(var(--card))"
          }
          stroke={themeAdaptive ? themeConfig.primary : "hsl(var(--border))"}
          strokeWidth="1"
          initial={
            shouldReduceMotion
              ? false
              : { y: finalDimensions.height * 0.75, opacity: 0 }
          }
          animate={
            shouldReduceMotion
              ? false
              : { y: finalDimensions.height * 0.7, opacity: 1 }
          }
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        {/* Monitor */}
        <motion.rect
          x={finalDimensions.width * 0.25}
          y={finalDimensions.height * 0.4}
          width={finalDimensions.width * 0.5}
          height={finalDimensions.height * 0.35}
          rx="6"
          fill={
            themeAdaptive
              ? `${themeConfig.background}80`
              : "hsl(var(--background))"
          }
          stroke={themeAdaptive ? themeConfig.primary : "hsl(var(--border))"}
          strokeWidth="2"
          initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
          animate={shouldReduceMotion ? false : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
        />
      </>
    );

    switch (effectiveVariant) {
      case "minimal":
        return (
          <>
            {baseElements}
            {/* Simple code representation */}
            <motion.rect
              x={finalDimensions.width * 0.3}
              y={finalDimensions.height * 0.5}
              width={finalDimensions.width * 0.4}
              height="4"
              rx="2"
              fill={themeAdaptive ? themeConfig.accent : "hsl(var(--primary))"}
              initial={shouldReduceMotion ? false : { width: 0 }}
              animate={
                shouldReduceMotion
                  ? false
                  : { width: finalDimensions.width * 0.4 }
              }
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </>
        );

      case "detailed":
        return (
          <>
            {baseElements}
            {/* Multiple code lines */}
            {[0, 1, 2].map((i) => (
              <motion.rect
                key={i}
                x={finalDimensions.width * 0.3}
                y={finalDimensions.height * 0.48 + i * 8}
                width={finalDimensions.width * (0.4 - i * 0.05)}
                height="4"
                rx="2"
                fill={
                  themeAdaptive
                    ? `${
                        [
                          themeConfig.primary,
                          themeConfig.secondary,
                          themeConfig.accent,
                        ][i]
                      }80`
                    : `hsl(var(--primary) / ${0.8 - i * 0.2})`
                }
                initial={shouldReduceMotion ? false : { width: 0 }}
                animate={
                  shouldReduceMotion
                    ? false
                    : {
                        width: finalDimensions.width * (0.4 - i * 0.05),
                      }
                }
                transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
              />
            ))}

            {/* Coffee cup */}
            <motion.circle
              cx={finalDimensions.width * 0.8}
              cy={finalDimensions.height * 0.75}
              r="8"
              fill={themeAdaptive ? themeConfig.accent : "hsl(var(--accent))"}
              initial={shouldReduceMotion ? false : { scale: 0 }}
              animate={shouldReduceMotion ? false : { scale: 1 }}
              transition={{ delay: 1.2, duration: 0.4, type: "spring" }}
            />
          </>
        );

      case "complex":
        return (
          <>
            {baseElements}
            {/* Dual monitor setup */}
            <motion.rect
              x={finalDimensions.width * 0.05}
              y={finalDimensions.height * 0.35}
              width={finalDimensions.width * 0.35}
              height={finalDimensions.height * 0.4}
              rx="4"
              fill={
                themeAdaptive
                  ? `${themeConfig.background}60`
                  : "hsl(var(--background))"
              }
              stroke={
                themeAdaptive ? themeConfig.secondary : "hsl(var(--border))"
              }
              strokeWidth="1"
              initial={shouldReduceMotion ? false : { x: -50, opacity: 0 }}
              animate={
                shouldReduceMotion
                  ? false
                  : { x: finalDimensions.width * 0.05, opacity: 1 }
              }
              transition={{ duration: 0.6, delay: 0.4 }}
            />

            {/* Code on both screens */}
            {[0, 1].map((screen) => (
              <g key={screen}>
                {[0, 1, 2, 3].map((line) => (
                  <motion.rect
                    key={line}
                    x={finalDimensions.width * (screen === 0 ? 0.1 : 0.3) + 5}
                    y={finalDimensions.height * 0.42 + line * 6}
                    width={finalDimensions.width * (0.25 - line * 0.02)}
                    height="3"
                    rx="1"
                    fill={
                      themeAdaptive
                        ? `${
                            [
                              themeConfig.primary,
                              themeConfig.secondary,
                              themeConfig.accent,
                              themeConfig.primary,
                            ][line]
                          }60`
                        : `hsl(var(--primary) / ${0.7 - line * 0.1})`
                    }
                    initial={shouldReduceMotion ? false : { width: 0 }}
                    animate={
                      shouldReduceMotion
                        ? false
                        : {
                            width: finalDimensions.width * (0.25 - line * 0.02),
                          }
                    }
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + screen * 0.2 + line * 0.05,
                    }}
                  />
                ))}
              </g>
            ))}

            {/* Floating particles */}
            {!shouldReduceMotion &&
              [0, 1, 2].map((i) => (
                <motion.circle
                  key={i}
                  cx={finalDimensions.width * (0.2 + i * 0.3)}
                  cy={finalDimensions.height * 0.2}
                  r="3"
                  fill={
                    themeAdaptive
                      ? `${
                          [
                            themeConfig.primary,
                            themeConfig.secondary,
                            themeConfig.accent,
                          ][i]
                        }40`
                      : "hsl(var(--primary) / 0.4)"
                  }
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                />
              ))}
          </>
        );

      default:
        return baseElements;
    }
  };

  return (
    <div className={`responsive-illustration ${className}`}>
      <svg
        width={finalDimensions.width}
        height={finalDimensions.height}
        viewBox={`0 0 ${finalDimensions.width} ${finalDimensions.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        style={{
          maxWidth: isMobile ? "100%" : "500px",
        }}
        aria-label="Professional developer workspace"
        role="img"
      >
        {renderVariant()}
      </svg>
    </div>
  );
};

// Responsive Journey Path with theme variations
export const ResponsiveJourneyPath: React.FC<ResponsiveIllustrationProps> = ({
  className = "",
  variant = "detailed",
  size = "responsive",
  themeAdaptive = true,
}) => {
  const { dimensions, isMobile } = useResponsiveSize();
  const themeConfig = useThemeVariations();
  const shouldReduceMotion = useReducedMotion();

  const pathDimensions =
    size === "responsive"
      ? {
          width: Math.min(dimensions.width * 1.2, isMobile ? 320 : 600),
          height: Math.min(dimensions.height * 0.8, isMobile ? 120 : 200),
        }
      : dimensions;

  const milestones = useMemo(
    () => [
      { x: 0.1, y: 0.8, label: "Start", icon: "circle" },
      { x: 0.35, y: 0.4, label: "Learn", icon: "square" },
      { x: 0.65, y: 0.6, label: "Grow", icon: "triangle" },
      { x: 0.9, y: 0.2, label: "Excel", icon: "star" },
    ],
    []
  );

  const pathData = `M${pathDimensions.width * 0.1} ${
    pathDimensions.height * 0.8
  } 
                   Q${pathDimensions.width * 0.25} ${
    pathDimensions.height * 0.3
  } 
                   ${pathDimensions.width * 0.35} ${
    pathDimensions.height * 0.4
  } 
                   T${pathDimensions.width * 0.65} ${
    pathDimensions.height * 0.6
  } 
                   Q${pathDimensions.width * 0.77} ${
    pathDimensions.height * 0.1
  } 
                   ${pathDimensions.width * 0.9} ${
    pathDimensions.height * 0.2
  }`;

  const renderMilestone = (
    milestone: (typeof milestones)[0],
    index: number
  ) => {
    const x = pathDimensions.width * milestone.x;
    const y = pathDimensions.height * milestone.y;
    const color = themeAdaptive
      ? [
          themeConfig.primary,
          themeConfig.secondary,
          themeConfig.accent,
          themeConfig.primary,
        ][index]
      : "hsl(var(--primary))";

    if (variant === "minimal") {
      return (
        <motion.circle
          key={index}
          cx={x}
          cy={y}
          r={isMobile ? "4" : "6"}
          fill={color}
          initial={shouldReduceMotion ? false : { scale: 0 }}
          animate={shouldReduceMotion ? false : { scale: 1 }}
          transition={{ delay: index * 0.3, duration: 0.4, type: "spring" }}
        />
      );
    }

    return (
      <motion.g key={index}>
        <motion.circle
          cx={x}
          cy={y}
          r={isMobile ? "6" : "8"}
          fill={color}
          initial={shouldReduceMotion ? false : { scale: 0 }}
          animate={shouldReduceMotion ? false : { scale: 1 }}
          transition={{ delay: index * 0.3, duration: 0.4, type: "spring" }}
        />

        {!isMobile && (
          <motion.text
            x={x}
            y={y - 15}
            textAnchor="middle"
            fill={themeAdaptive ? color : "hsl(var(--foreground))"}
            fontSize={isMobile ? "10" : "12"}
            fontWeight="500"
            initial={shouldReduceMotion ? false : { opacity: 0, y: y - 10 }}
            animate={shouldReduceMotion ? false : { opacity: 1, y: y - 15 }}
            transition={{ delay: index * 0.3 + 0.2, duration: 0.4 }}
          >
            {milestone.label}
          </motion.text>
        )}
      </motion.g>
    );
  };

  return (
    <div className={`responsive-journey ${className}`}>
      <svg
        width={pathDimensions.width}
        height={pathDimensions.height}
        viewBox={`0 0 ${pathDimensions.width} ${pathDimensions.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-label="Professional journey path"
        role="img"
      >
        {/* Path */}
        <motion.path
          d={pathData}
          stroke={themeAdaptive ? themeConfig.primary : "hsl(var(--primary))"}
          strokeWidth={isMobile ? "2" : "3"}
          fill="none"
          strokeDasharray={isMobile ? "3,3" : "5,5"}
          initial={shouldReduceMotion ? false : { pathLength: 0 }}
          animate={shouldReduceMotion ? false : { pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Milestones */}
        {milestones.map(renderMilestone)}
      </svg>
    </div>
  );
};

// Responsive Timeline Decoration
export const ResponsiveTimelineDecoration: React.FC<
  ResponsiveIllustrationProps & {
    position?: "left" | "right";
  }
> = ({
  className = "",
  position = "left",
  size = "responsive",
  themeAdaptive = true,
}) => {
  const { isMobile } = useResponsiveSize();
  const themeConfig = useThemeVariations();
  const shouldReduceMotion = useReducedMotion();

  const getSize = () => {
    if (size === "responsive") {
      return isMobile ? 40 : 60;
    }
    const sizeMap = { xs: 30, sm: 40, md: 50, lg: 60, xl: 70 };
    return sizeMap[size as keyof typeof sizeMap] || 50;
  };

  const decorationSize = getSize();

  return (
    <motion.svg
      width={decorationSize}
      height={decorationSize}
      viewBox={`0 0 ${decorationSize} ${decorationSize}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={
        shouldReduceMotion
          ? undefined
          : { rotate: position === "left" ? -10 : 10, opacity: 0 }
      }
      animate={shouldReduceMotion ? undefined : { rotate: 0, opacity: 1 }}
      whileInView={shouldReduceMotion ? undefined : { rotate: 0, opacity: 1 }}
      transition={
        shouldReduceMotion ? undefined : { duration: 0.6, ease: "easeOut" }
      }
      viewport={{ once: true }}
    >
      <motion.circle
        cx={decorationSize / 2}
        cy={decorationSize / 2}
        r={decorationSize * 0.42}
        stroke={
          themeAdaptive
            ? `${themeConfig.primary}40`
            : "hsl(var(--primary) / 0.3)"
        }
        strokeWidth="2"
        fill="none"
        strokeDasharray="4,4"
        animate={
          shouldReduceMotion
            ? false
            : {
                rotate: position === "left" ? 360 : -360,
              }
        }
        transition={{
          duration: shouldReduceMotion ? 0 : 20,
          repeat: shouldReduceMotion ? 0 : Infinity,
          ease: "linear",
        }}
      />
      <motion.circle
        cx={decorationSize / 2}
        cy={decorationSize / 2}
        r={decorationSize * 0.25}
        fill={
          themeAdaptive
            ? `${themeConfig.primary}20`
            : "hsl(var(--primary) / 0.1)"
        }
        animate={
          shouldReduceMotion
            ? false
            : {
                scale: [1, 1.1, 1],
              }
        }
        transition={{
          duration: shouldReduceMotion ? 0 : 2,
          repeat: shouldReduceMotion ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.circle
        cx={decorationSize / 2}
        cy={decorationSize / 2}
        r={decorationSize * 0.13}
        fill={themeAdaptive ? themeConfig.primary : "hsl(var(--primary))"}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.4, type: "spring" }}
        viewport={{ once: true }}
      />
    </motion.svg>
  );
};

// Responsive Background Pattern
export const ResponsiveBackgroundPattern: React.FC<
  ResponsiveIllustrationProps & {
    density?: "low" | "medium" | "high";
  }
> = ({ className = "", density = "medium", themeAdaptive = true }) => {
  const { isMobile } = useResponsiveSize();
  const themeConfig = useThemeVariations();
  const shouldReduceMotion = useReducedMotion();

  const patternSpacing = useMemo(() => {
    const base = { low: 40, medium: 25, high: 15 };
    return isMobile ? base[density] * 1.5 : base[density];
  }, [density, isMobile]);

  const opacity = isMobile ? 0.1 : 0.2;

  return (
    <div
      className={`responsive-background-pattern absolute inset-0 ${className}`}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: -1 }}
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={`responsive-grid-pattern-${density}`}
            x="0"
            y="0"
            width={patternSpacing}
            height={patternSpacing}
            patternUnits="userSpaceOnUse"
          >
            <motion.circle
              cx={patternSpacing / 2}
              cy={patternSpacing / 2}
              r={isMobile ? "0.5" : "1"}
              fill={themeAdaptive ? themeConfig.primary : "hsl(var(--primary))"}
              opacity={opacity}
              animate={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: [opacity * 0.5, opacity * 1.5, opacity * 0.5],
                    }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 4,
                repeat: shouldReduceMotion ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#responsive-grid-pattern-${density})`}
        />
      </svg>
    </div>
  );
};
