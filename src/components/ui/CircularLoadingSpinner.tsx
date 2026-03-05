"use client";

import { motion } from "framer-motion";
import React from "react";

import { useReducedMotion } from "@/lib/animations/hooks";

interface CircularLoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showProgress?: boolean;
  progress?: number;
  color?: "primary" | "accent" | "muted";
}

export const CircularLoadingSpinner: React.FC<CircularLoadingSpinnerProps> = ({
  size = "md",
  className = "",
  showProgress = false,
  progress = 0,
  color = "primary",
}) => {
  const { prefersReducedMotion } = useReducedMotion();

  const sizes = {
    sm: { width: 24, height: 24, strokeWidth: 2 },
    md: { width: 32, height: 32, strokeWidth: 2.5 },
    lg: { width: 48, height: 48, strokeWidth: 3 },
    xl: { width: 64, height: 64, strokeWidth: 4 },
  };

  const colors = {
    primary: "stroke-primary",
    accent: "stroke-accent",
    muted: "stroke-muted-foreground",
  };

  const { width, height, strokeWidth } = sizes[size];
  const radius = (width - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;

  // For reduced motion, show a static spinner
  if (prefersReducedMotion) {
    return (
      <div
        className={`inline-block ${className}`}
        style={{ width, height }}
        role="status"
        aria-label="Loading"
      >
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="text-current"
        >
          <circle
            cx={width / 2}
            cy={height / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="opacity-25"
          />
          <circle
            cx={width / 2}
            cy={height / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.75}
            className={colors[color]}
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`inline-block ${className}`}
      style={{ width, height }}
      role="status"
      aria-label="Loading"
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="text-current"
      >
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="opacity-25"
        />

        {/* Animated progress circle */}
        <motion.circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className={colors[color]}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: showProgress
              ? circumference - (progress / 100) * circumference
              : circumference * 0.75,
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
          animate={
            showProgress
              ? undefined
              : {
                  rotate: 360,
                }
          }
          transition={
            showProgress
              ? undefined
              : {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }
          }
        />
      </svg>
    </div>
  );
};

export default CircularLoadingSpinner;
