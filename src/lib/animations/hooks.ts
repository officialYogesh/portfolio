import { useInView, useAnimation, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { useTheme } from "../../contexts/ThemeContext";

/**
 * Hook for scroll-triggered animations using Intersection Observer
 */
export function useScrollAnimation(threshold = 0.1, triggerOnce = true) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once: triggerOnce,
    margin: "0px 0px -100px 0px",
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!triggerOnce) {
      controls.start("hidden");
    }
  }, [isInView, controls, triggerOnce]);

  return { ref, controls, isInView };
}

/**
 * Hook for staggered animations with configurable delays
 */
export function useStaggerAnimation(
  itemCount: number,
  staggerDelay = 0.1,
  initialDelay = 0
) {
  const controls = useAnimation();
  const [hasTriggered, setHasTriggered] = useState(false);

  const startAnimation = async () => {
    if (hasTriggered) return;

    setHasTriggered(true);

    // Start container animation
    await controls.start("visible");

    // Stagger children animations
    for (let i = 0; i < itemCount; i++) {
      setTimeout(() => {
        controls.start(`item-${i}`);
      }, initialDelay + i * staggerDelay * 1000);
    }
  };

  const resetAnimation = () => {
    setHasTriggered(false);
    controls.start("hidden");
  };

  return { controls, startAnimation, resetAnimation, hasTriggered };
}

/**
 * Hook for parallax scrolling effects
 */
export function useParallax(factor = 0.5) {
  const ref = useRef<HTMLElement>(null);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const scrollProgress = -rect.top / (window.innerHeight + rect.height);
      y.set(scrollProgress * factor * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [factor, y]);

  return { ref, y };
}

/**
 * Hook for reduced motion detection and preferences
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Return simplified animations if reduced motion is preferred
  const getVariant = (normal: unknown, reduced: unknown) => {
    return prefersReducedMotion ? reduced : normal;
  };

  const getDuration = (normal: number) => {
    return prefersReducedMotion ? 0.01 : normal;
  };

  return { prefersReducedMotion, getVariant, getDuration };
}

/**
 * Hook for mouse tracking and magnetic effects
 */
export function useMouseTracking(strength = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (event.clientX - centerX) * strength;
      const deltaY = (event.clientY - centerY) * strength;

      x.set(deltaX);
      y.set(deltaY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const element = ref.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [strength, x, y]);

  return { ref, x, y };
}

/**
 * Hook for typing animation effects
 */
export function useTypingAnimation(text: string, speed = 50, startDelay = 0) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setDisplayText("");
    setIsComplete(false);

    setTimeout(() => {
      let index = 0;
      const timer = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          setIsComplete(true);
          setIsAnimating(false);
        }
      }, speed);

      return () => clearInterval(timer);
    }, startDelay);
  };

  const resetAnimation = () => {
    setDisplayText("");
    setIsComplete(false);
    setIsAnimating(false);
  };

  return {
    displayText,
    isComplete,
    isAnimating,
    startAnimation,
    resetAnimation,
  };
}

/**
 * Hook for theme-aware animations
 */
export function useThemeAnimation() {
  const { currentTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentTheme]);

  const getThemeTransition = () => ({
    type: "tween",
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1],
  });

  return { isTransitioning, getThemeTransition, currentTheme };
}

/**
 * Hook for scroll progress tracking
 */
export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollProgress;
}

/**
 * Hook for viewport-based animations
 */
export function useViewportAnimation() {
  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = viewportSize.width < 768;
  const isTablet = viewportSize.width >= 768 && viewportSize.width < 1024;
  const isDesktop = viewportSize.width >= 1024;

  return { viewportSize, isMobile, isTablet, isDesktop };
}
