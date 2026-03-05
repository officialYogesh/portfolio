"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import React, { useRef, useEffect } from "react";

import { useParallax, useReducedMotion } from "../../lib/animations/hooks";
import { cn } from "../../lib/utils";

export interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  offset?: number;
  direction?: "horizontal" | "vertical";
  style?: React.CSSProperties;
}

export interface ParallaxScrollProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

/**
 * Individual parallax layer component
 */
export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  className = "",
  speed = 0.5,
  offset = 0,
  direction = "vertical",
  style = {},
}) => {
  const { ref, y } = useParallax(speed);
  const { prefersReducedMotion } = useReducedMotion();

  // Create spring animation for smoother parallax
  const springY = useSpring(y, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  // Transform for horizontal parallax
  const x = useTransform(springY, (value) => {
    return direction === "horizontal" ? value : 0;
  });

  const transformY = useTransform(springY, (value) => {
    return direction === "vertical" ? value + offset : offset;
  });

  if (prefersReducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      style={{
        ...style,
        x: direction === "horizontal" ? x : 0,
        y: transformY,
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Main parallax scroll container component
 */
export const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  children,
  className = "",
  containerClassName = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useReducedMotion();

  // Performance optimization: add will-change property
  useEffect(() => {
    const currentRef = containerRef.current;
    if (currentRef && !prefersReducedMotion) {
      currentRef.style.willChange = "transform";
    }

    return () => {
      if (currentRef) {
        currentRef.style.willChange = "auto";
      }
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className={cn("relative", containerClassName)}>
        <div className={className}>{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      <div className={cn("relative", className)}>{children}</div>
    </div>
  );
};

/**
 * Pre-built parallax sections for common use cases
 */
export const ParallaxHero: React.FC<{
  backgroundImage: string;
  children: React.ReactNode;
  className?: string;
  speed?: number;
  overlay?: boolean;
}> = ({
  backgroundImage,
  children,
  className = "",
  speed = 0.3,
  overlay = true,
}) => (
  <ParallaxScroll
    containerClassName="min-h-screen relative"
    className={cn("flex items-center justify-center", className)}
  >
    <ParallaxLayer speed={speed} className="absolute inset-0 z-0">
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      {overlay && <div className="absolute inset-0 bg-black/30" />}
    </ParallaxLayer>

    <div className="relative z-10 text-center text-white">{children}</div>
  </ParallaxScroll>
);

/**
 * Multi-layer parallax section
 */
export const ParallaxSection: React.FC<{
  layers: Array<{
    content: React.ReactNode;
    speed: number;
    className?: string;
    zIndex?: number;
  }>;
  className?: string;
  height?: string;
}> = ({ layers, className = "", height = "min-h-screen" }) => (
  <ParallaxScroll
    containerClassName={cn("relative", height)}
    className={className}
  >
    {layers.map((layer, index) => (
      <ParallaxLayer
        key={index}
        speed={layer.speed}
        className={cn("absolute inset-0", layer.className)}
        style={{
          zIndex: layer.zIndex || index,
        }}
      >
        {layer.content}
      </ParallaxLayer>
    ))}
  </ParallaxScroll>
);

export default ParallaxScroll;
