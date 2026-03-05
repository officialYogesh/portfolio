/**
 * Performance optimization utilities for animations
 * Provides GPU acceleration hints, performance monitoring, and memory management
 */

import { MotionProps } from "framer-motion";

// Performance-optimized transition settings
export const performanceTransitions = {
  // Fast transitions for interactions
  fast: {
    type: "tween" as const,
    duration: 0.15,
    ease: [0.4, 0, 0.2, 1],
  },

  // Medium transitions for most animations
  medium: {
    type: "tween" as const,
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1],
  },

  // Slow transitions for dramatic effects
  slow: {
    type: "tween" as const,
    duration: 0.6,
    ease: [0.4, 0, 0.2, 1],
  },

  // Spring transitions for bouncy effects
  spring: {
    type: "spring" as const,
    stiffness: 260,
    damping: 20,
  },

  // Smooth spring for gentle animations
  smoothSpring: {
    type: "spring" as const,
    stiffness: 100,
    damping: 15,
  },
} as const;

// GPU-accelerated CSS properties that should be used for animations
export const gpuAcceleratedProperties = [
  "transform",
  "opacity",
  "filter",
  "backdrop-filter",
] as const;

// Properties that should be avoided for performance
export const avoidedProperties = [
  "width",
  "height",
  "padding",
  "margin",
  "border-width",
  "font-size",
] as const;

/**
 * Adds will-change CSS property to optimize animations
 */
export function addWillChange(
  element: HTMLElement,
  properties: string[]
): void {
  if (!element) return;

  const willChangeValue = properties.join(", ");
  element.style.willChange = willChangeValue;
}

/**
 * Removes will-change CSS property after animation completes
 */
export function removeWillChange(element: HTMLElement): void {
  if (!element) return;

  element.style.willChange = "auto";
}

/**
 * Creates performance-optimized motion props
 */
export function createPerformantMotionProps(
  initialProps: Partial<MotionProps>
): MotionProps {
  return {
    ...initialProps,
    // Enable GPU acceleration
    style: {
      ...initialProps.style,
      transform: "translateZ(0)", // Force GPU layer
    },
    // Optimize layout calculations
    layout: false,
    // Use efficient transform properties
    transformTemplate: ({ x, y, rotate, scale }) => {
      return `translate3d(${x || 0}, ${y || 0}, 0) rotate(${
        rotate || 0
      }) scale(${scale || 1})`;
    },
  };
}

/**
 * Performance monitoring utilities
 */
export class AnimationPerformanceMonitor {
  private static instance: AnimationPerformanceMonitor;
  private frameCount = 0;
  private lastTime = 0;
  private fps = 0;
  private isMonitoring = false;

  static getInstance(): AnimationPerformanceMonitor {
    if (!AnimationPerformanceMonitor.instance) {
      AnimationPerformanceMonitor.instance = new AnimationPerformanceMonitor();
    }
    return AnimationPerformanceMonitor.instance;
  }

  startMonitoring(): void {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    this.lastTime = performance.now();
    this.updateFPS();
  }

  stopMonitoring(): void {
    this.isMonitoring = false;
  }

  private updateFPS(): void {
    if (!this.isMonitoring) return;

    const currentTime = performance.now();
    this.frameCount++;

    if (currentTime - this.lastTime >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastTime = currentTime;

      // Log performance warnings
      if (this.fps < 55) {
        console.warn(`Animation performance warning: ${this.fps} FPS detected`);
      }
    }

    requestAnimationFrame(() => this.updateFPS());
  }

  getFPS(): number {
    return this.fps;
  }
}

/**
 * Memory management for animations
 */
export class AnimationMemoryManager {
  private static instance: AnimationMemoryManager;
  private activeAnimations = new Set<string>();
  private animationCleanupMap = new Map<string, () => void>();

  static getInstance(): AnimationMemoryManager {
    if (!AnimationMemoryManager.instance) {
      AnimationMemoryManager.instance = new AnimationMemoryManager();
    }
    return AnimationMemoryManager.instance;
  }

  registerAnimation(id: string, cleanup?: () => void): void {
    this.activeAnimations.add(id);
    if (cleanup) {
      this.animationCleanupMap.set(id, cleanup);
    }
  }

  unregisterAnimation(id: string): void {
    this.activeAnimations.delete(id);

    const cleanup = this.animationCleanupMap.get(id);
    if (cleanup) {
      cleanup();
      this.animationCleanupMap.delete(id);
    }
  }

  getActiveAnimationCount(): number {
    return this.activeAnimations.size;
  }

  cleanupAllAnimations(): void {
    this.animationCleanupMap.forEach((cleanup) => cleanup());
    this.animationCleanupMap.clear();
    this.activeAnimations.clear();
  }
}

/**
 * Throttle function for expensive operations during animations
 */
export function throttleAnimation<T extends (...args: never[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Debounce function for resize-dependent animations
 */
export function debounceAnimation<T extends (...args: never[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Check if the current device supports GPU acceleration
 */
export function supportsGPUAcceleration(): boolean {
  if (typeof window === "undefined") return false;

  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  return !!gl;
}

/**
 * Get optimal animation settings based on device capabilities
 */
export function getOptimalAnimationSettings() {
  const hasGPU = supportsGPUAcceleration();
  const isLowEndDevice = navigator.hardwareConcurrency < 4;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  return {
    shouldUseGPUAcceleration: hasGPU,
    shouldReduceAnimations: isLowEndDevice || prefersReducedMotion,
    maxSimultaneousAnimations: isLowEndDevice ? 3 : 8,
    preferredDuration: isLowEndDevice ? 0.2 : 0.3,
    shouldUseSpring: hasGPU && !isLowEndDevice,
  };
}

/**
 * Preload animation resources
 */
export function preloadAnimationResources(): Promise<void> {
  return new Promise((resolve) => {
    // Preload any heavy animation resources here
    // For now, just ensure RAF is available
    if (typeof requestAnimationFrame !== "undefined") {
      requestAnimationFrame(() => resolve());
    } else {
      setTimeout(resolve, 16);
    }
  });
}
