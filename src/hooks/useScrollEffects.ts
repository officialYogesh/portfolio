"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// Throttle function for performance optimization
const throttle = <T extends (...args: Parameters<T>) => void>(
  func: T,
  limit: number
) => {
  let inThrottle: boolean;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Debounce function for theme changes
const debounce = <T extends (...args: Parameters<T>) => void>(
  func: T,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// Hook for tracking scroll progress with throttling
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = throttle(() => {
      // Use RAF for smooth updates
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const totalHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const currentProgress = window.scrollY;
        const progress = Math.min(
          Math.max((currentProgress / totalHeight) * 100, 0),
          100
        );
        setScrollProgress(progress);
      });
    }, 16); // ~60fps

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return scrollProgress;
};

// Hook for parallax effects with throttling
export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        setOffset(window.scrollY * speed);
      });
    }, 16); // ~60fps

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [speed]);

  return offset;
};

// Optimized hook for section tracking with fast scroll handling
export const useSectionTracking = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState("");
  const [completedSections, setCompletedSections] = useState<Set<string>>(
    new Set()
  );
  const observerRef = useRef<IntersectionObserver | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -60% 0px", // Better sensitivity for fast scrolling
      threshold: [0, 0.1, 0.3, 0.5, 0.7, 1], // More threshold points for accuracy
    };

    // Fast scroll handler with RAF for smooth updates
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        let currentActive = "";
        const newCompleted = new Set(completedSections);

        // Process all entries to find the most visible section
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          const rect = entry.boundingClientRect;

          // Mark as active if it's the most visible section
          if (entry.isIntersecting) {
            // For fast scrolling, prioritize sections that are most in view
            const visibilityRatio = entry.intersectionRatio;
            if (visibilityRatio > 0.1) {
              currentActive = sectionId;
            }
          }

          // Mark section as completed if user has scrolled past it
          if (rect.bottom < window.innerHeight * 0.3) {
            newCompleted.add(sectionId);
          }
        });

        // Additional check for fast scrolling - find the section closest to viewport center
        if (!currentActive) {
          const viewportCenter = window.innerHeight / 2;
          let closestSection = "";
          let closestDistance = Infinity;

          sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
              const rect = element.getBoundingClientRect();
              const sectionCenter = rect.top + rect.height / 2;
              const distance = Math.abs(sectionCenter - viewportCenter);

              if (
                distance < closestDistance &&
                rect.top < viewportCenter &&
                rect.bottom > 0
              ) {
                closestDistance = distance;
                closestSection = id;
              }
            }
          });

          if (closestSection) {
            currentActive = closestSection;
          }
        }

        if (currentActive) {
          setActiveSection(currentActive);
        }

        if (newCompleted.size !== completedSections.size) {
          setCompletedSections(newCompleted);
        }
      });
    };

    observerRef.current = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    // Observe sections with error handling
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [sectionIds, completedSections]);

  return { activeSection, completedSections };
};

// Hook for smooth scrolling with optimization
export const useSmoothScroll = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;

      // Use native smooth scroll for better performance
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return { scrollToSection };
};

// Hook for touch gestures with optimization
export const useTouchGestures = () => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = useCallback((e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    return { isLeftSwipe, isRightSwipe, distance };
  }, [touchStart, touchEnd]);

  return { onTouchStart, onTouchMove, onTouchEnd };
};

// Optimized hook for theme-aware animations
export const useThemeAwareAnimations = () => {
  const [theme, setTheme] = useState<string>("");
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    const getTheme = () => {
      return document.documentElement.getAttribute("data-theme") || "dracula";
    };

    setTheme(getTheme());

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Debounced theme change handler
    const handleThemeChange = debounce(() => {
      setTheme(getTheme());
    }, 100);

    observerRef.current = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          handleThemeChange();
        }
      });
    });

    observerRef.current.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Memoized and optimized theme-specific animation variants
  const getThemeAnimations = useCallback(() => {
    const baseAnimations = {
      initial: { opacity: 0, y: 10 }, // Reduced movement for better performance
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
    };

    // Simplified transitions for better performance
    const optimizedTransition = {
      type: "tween" as const, // Use tween instead of spring for better performance
      duration: 0.3, // Shorter duration
      ease: [0.4, 0, 0.2, 1] as const, // Cubic bezier for smooth transitions
    };

    return {
      ...baseAnimations,
      transition: optimizedTransition,
    };
  }, []);

  return { theme, getThemeAnimations };
};

// Hook for reading time calculation
export const useReadingTime = (content: string) => {
  const [readingTime, setReadingTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const words = content.split(/\s+/).filter((word) => word.length > 0);
    const wpm = 200; // Average reading speed
    const time = Math.ceil(words.length / wpm);

    setWordCount(words.length);
    setReadingTime(time);
  }, [content]);

  return { readingTime, wordCount };
};

// Hook for performance monitoring
export const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = useState({
    lcp: 0,
    fid: 0,
    cls: 0,
    fcp: 0,
  });

  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== "undefined" && "web-vitals" in window) {
      // This would require the web-vitals library
      // For now, we'll simulate metrics
      const mockMetrics = {
        lcp: Math.random() * 2000 + 1000, // 1-3 seconds
        fid: Math.random() * 50 + 10, // 10-60ms
        cls: Math.random() * 0.1, // 0-0.1
        fcp: Math.random() * 1500 + 500, // 0.5-2 seconds
      };
      setMetrics(mockMetrics);
    }
  }, []);

  return metrics;
};

// Hook for error handling
export const useErrorHandling = () => {
  const [errors, setErrors] = useState<Error[]>([]);

  const handleError = useCallback((error: Error) => {
    console.error("Application Error:", error);
    setErrors((prev) => [...prev, error]);

    // Report to error tracking service (e.g., Sentry)
    // errorTrackingService.captureException(error);
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  return { errors, handleError, clearErrors };
};
