"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect, useRef, useCallback } from "react";

import { useReducedMotion } from "../../lib/animations/hooks";
import { cn } from "../../lib/utils";

export interface MorphingShape {
  id: string;
  path: string;
  duration?: number;
  easing?: string;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export interface MorphingIllustrationProps {
  shapes: MorphingShape[];
  currentShapeIndex?: number;
  autoPlay?: boolean;
  interval?: number;
  width?: number;
  height?: number;
  viewBox?: string;
  className?: string;
  onShapeChange?: (index: number) => void;
  triggerOnInView?: boolean;
  loop?: boolean;
}

/**
 * Morphing SVG illustration component with smooth transitions between shapes
 */
export const MorphingIllustration: React.FC<MorphingIllustrationProps> = ({
  shapes,
  currentShapeIndex = 0,
  autoPlay = false,
  interval = 3000,
  width = 400,
  height = 400,
  viewBox,
  className = "",
  onShapeChange,
  loop = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(currentShapeIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const { prefersReducedMotion } = useReducedMotion();

  // Handle shape morphing animation
  const morphToShape = useCallback(
    async (targetIndex: number) => {
      if (
        targetIndex === activeIndex ||
        targetIndex >= shapes.length ||
        isAnimating ||
        prefersReducedMotion
      )
        return;

      setIsAnimating(true);
      const targetShape = shapes[targetIndex];

      if (pathRef.current) {
        // Update the path attribute directly
        pathRef.current.setAttribute("d", targetShape.path);
      }

      setActiveIndex(targetIndex);
      setIsAnimating(false);
      onShapeChange?.(targetIndex);
    },
    [activeIndex, isAnimating, prefersReducedMotion, shapes, onShapeChange]
  );

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Handle auto-play functionality
  useEffect(() => {
    if (!autoPlay || shapes.length <= 1 || prefersReducedMotion) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = prev + 1;
        return nextIndex >= shapes.length ? (loop ? 0 : prev) : nextIndex;
      });
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, interval, shapes.length, loop, prefersReducedMotion]);

  // Handle external shape index changes
  useEffect(() => {
    if (currentShapeIndex !== activeIndex) {
      morphToShape(currentShapeIndex);
    }
  }, [currentShapeIndex, activeIndex, morphToShape]);

  const currentShape = shapes[activeIndex];
  const calculatedViewBox = viewBox || `0 0 ${width} ${height}`;

  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className={cn("flex items-center justify-center", className)}
      >
        <svg
          width={width}
          height={height}
          viewBox={calculatedViewBox}
          className="overflow-visible"
        >
          <path
            d={currentShape?.path}
            fill={currentShape?.fillColor || "currentColor"}
            stroke={currentShape?.strokeColor || "none"}
            strokeWidth={currentShape?.strokeWidth || 0}
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("flex items-center justify-center", className)}
    >
      <svg
        width={width}
        height={height}
        viewBox={calculatedViewBox}
        className="overflow-visible"
      >
        <motion.path
          ref={pathRef}
          d={currentShape?.path}
          fill={currentShape?.fillColor || "currentColor"}
          stroke={currentShape?.strokeColor || "none"}
          strokeWidth={currentShape?.strokeWidth || 0}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 2, ease: "easeInOut" },
            opacity: { duration: 0.3 },
          }}
          style={{
            filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
          }}
        />
      </svg>
    </div>
  );
};

/**
 * Pre-built morphing icon component with common shapes
 */
export const MorphingIcon: React.FC<{
  icons: Array<{
    name: string;
    path: string;
    color?: string;
  }>;
  currentIcon?: string;
  size?: number;
  className?: string;
  autoPlay?: boolean;
  interval?: number;
}> = ({
  icons,
  currentIcon,
  size = 24,
  className = "",
  autoPlay = false,
  interval = 2000,
}) => {
  const shapes: MorphingShape[] = icons.map((icon) => ({
    id: icon.name,
    path: icon.path,
    fillColor: icon.color || "currentColor",
    duration: 0.8,
  }));

  const currentIndex = currentIcon
    ? icons.findIndex((icon) => icon.name === currentIcon)
    : 0;

  return (
    <MorphingIllustration
      shapes={shapes}
      currentShapeIndex={Math.max(0, currentIndex)}
      autoPlay={autoPlay}
      interval={interval}
      width={size}
      height={size}
      className={className}
    />
  );
};

/**
 * Morphing logo component for brand animations
 */
export const MorphingLogo: React.FC<{
  variants: Array<{
    id: string;
    path: string;
    color?: string;
    duration?: number;
  }>;
  currentVariant?: string;
  width?: number;
  height?: number;
  className?: string;
  onHover?: boolean;
}> = ({
  variants,
  currentVariant,
  width = 120,
  height = 40,
  className = "",
  onHover = false,
}) => {
  const [hovered, setHovered] = useState(false);

  const shapes: MorphingShape[] = variants.map((variant) => ({
    id: variant.id,
    path: variant.path,
    fillColor: variant.color || "currentColor",
    duration: variant.duration || 0.6,
  }));

  const currentIndex = currentVariant
    ? variants.findIndex((v) => v.id === currentVariant)
    : 0;

  const displayIndex = onHover && hovered ? 1 : currentIndex;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
    >
      <MorphingIllustration
        shapes={shapes}
        currentShapeIndex={displayIndex}
        width={width}
        height={height}
        autoPlay={false}
      />
    </div>
  );
};

/**
 * Utility function to create morphing shapes from SVG paths
 */
export const createMorphingShapes = (
  paths: string[],
  options: {
    colors?: string[];
    durations?: number[];
    strokeColors?: string[];
    strokeWidths?: number[];
  } = {}
): MorphingShape[] => {
  return paths.map((path, index) => ({
    id: `shape-${index}`,
    path,
    fillColor: options.colors?.[index] || "currentColor",
    duration: options.durations?.[index] || 1,
    strokeColor: options.strokeColors?.[index] || "none",
    strokeWidth: options.strokeWidths?.[index] || 0,
  }));
};

export default MorphingIllustration;
