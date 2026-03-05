/**
 * Animation Framework Exports
 * Central export file for all animation utilities, hooks, components, and variants
 */

// Animation variants
export * from "./variants";

// Animation hooks
export * from "./hooks";

// Animation utilities and constants
export * from "./utils";

// Performance optimization utilities
export * from "./performance";

// Default animation configuration
export const ANIMATION_CONFIG = {
  // Global reduced motion setting
  respectReducedMotion: true,

  // Performance monitoring
  enablePerformanceMonitoring: process.env.NODE_ENV === "development",

  // GPU acceleration
  useGPUAcceleration: true,

  // Animation quality based on device
  adaptToDevice: true,

  // Memory cleanup
  enableMemoryCleanup: true,
} as const;

// Animation framework initialization
export function initializeAnimationFramework() {
  if (typeof window === "undefined") return;

  // Initialize performance monitoring in development
  if (ANIMATION_CONFIG.enablePerformanceMonitoring) {
    import("./performance")
      .then(({ AnimationPerformanceMonitor }) => {
        const monitor = AnimationPerformanceMonitor.getInstance();
        monitor.startMonitoring();
      })
      .catch(console.warn);
  }

  // Preload animation resources
  import("./performance")
    .then(({ preloadAnimationResources }) => {
      preloadAnimationResources().catch(console.warn);
    })
    .catch(console.warn);

  // Setup global animation cleanup on page unload
  if (ANIMATION_CONFIG.enableMemoryCleanup) {
    import("./performance")
      .then(({ AnimationMemoryManager }) => {
        const memoryManager = AnimationMemoryManager.getInstance();

        window.addEventListener("beforeunload", () => {
          memoryManager.cleanupAllAnimations();
        });
      })
      .catch(console.warn);
  }
}
