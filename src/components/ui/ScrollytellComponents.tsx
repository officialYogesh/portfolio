"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ChevronRight, Clock, Heart } from "lucide-react";
import React, { useState, useEffect, useRef, useMemo } from "react";

// Optimized Reading Progress Indicator
interface ReadingProgressProps {
  className?: string;
}

export const ReadingProgress: React.FC<ReadingProgressProps> = ({
  className = "",
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent origin-left z-50 ${className}`}
      style={{ scaleX, willChange: "transform" }}
    />
  );
};

// Optimized Story Section Component with Reduced Animations
interface StorySectionProps {
  id: string;
  title: string;
  subtitle?: string;
  content: string[];
  anecdote?: string;
  highlight?: string;
  emotion?:
    | "curiosity"
    | "challenge"
    | "growth"
    | "achievement"
    | "reflection"
    | "innovation"
    | "confidence"
    | "vision";
  visualCue?: string;
  className?: string;
  delay?: number;
}

export const StorySection: React.FC<StorySectionProps> = ({
  id,
  title,
  subtitle,
  content,
  anecdote,
  highlight,
  emotion,
  visualCue,
  className = "",
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: 0.1,
    once: true,
    margin: "0px 0px -100px 0px",
  });

  // Memoized emotion styles to prevent recalculation
  const emotionStyles = useMemo(() => {
    switch (emotion) {
      case "curiosity":
        return "border-l-blue-400/20 bg-blue-50/10";
      case "challenge":
        return "border-l-orange-400/20 bg-orange-50/10";
      case "growth":
        return "border-l-green-400/20 bg-green-50/10";
      case "achievement":
        return "border-l-purple-400/20 bg-purple-50/10";
      case "reflection":
        return "border-l-indigo-400/20 bg-indigo-50/10";
      case "innovation":
        return "border-l-pink-400/20 bg-pink-50/10";
      case "confidence":
        return "border-l-teal-400/20 bg-teal-50/10";
      case "vision":
        return "border-l-lime-400/20 bg-lime-50/10";
      default:
        return "";
    }
  }, [emotion]);

  // Simplified animation variants
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "tween",
          duration: 0.4,
          delay: delay * 0.05, // Reduced delay multiplier
          ease: "easeOut",
        },
      },
    }),
    [delay]
  );

  const titleVariants = useMemo(
    () => ({
      hidden: { opacity: 0, x: -10 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          type: "tween",
          duration: 0.3,
          delay: delay * 0.05 + 0.1,
          ease: "easeOut",
        },
      },
    }),
    [delay]
  );

  return (
    <motion.div
      ref={ref}
      id={id}
      className={`space-y-6 ${className}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      style={{ willChange: "transform, opacity" }}
    >
      {/* Visual Cue and Title */}
      <motion.div
        variants={titleVariants}
        className="flex items-center space-x-4"
      >
        {visualCue && (
          <span className="text-3xl" role="img" aria-label="Visual cue">
            {visualCue}
          </span>
        )}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted font-medium">{subtitle}</p>
          )}
        </div>
      </motion.div>

      {/* Main Content - Simplified Animation */}
      <div className="space-y-4">
        {content.map((paragraph, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              type: "tween",
              duration: 0.3,
              delay: delay * 0.05 + 0.15 + index * 0.05, // Reduced stagger
              ease: "easeOut",
            }}
            className="text-lg leading-relaxed text-foreground/90"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      {/* Highlight - Simplified */}
      {highlight && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            type: "tween",
            duration: 0.3,
            delay: delay * 0.05 + 0.2,
            ease: "easeOut",
          }}
          className={`p-6 rounded-lg border-l-4 ${emotionStyles} backdrop-blur-sm`}
        >
          <div className="flex items-start space-x-3">
            <Heart className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <p className="text-base font-medium text-foreground/90 italic">
              {highlight}
            </p>
          </div>
        </motion.div>
      )}

      {/* Anecdote - Simplified */}
      {anecdote && (
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            type: "tween",
            duration: 0.3,
            delay: delay * 0.05 + 0.25,
            ease: "easeOut",
          }}
          className="border-l-4 border-accent pl-6 py-4 bg-accent/5 rounded-r-lg"
        >
          <p className="text-base italic text-foreground/80 leading-relaxed">
            &ldquo;{anecdote}&rdquo;
          </p>
        </motion.blockquote>
      )}
    </motion.div>
  );
};

// Optimized Parallax Text Component with Throttling
interface ParallaxTextProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxText: React.FC<ParallaxTextProps> = ({
  children,
  speed = 0.3, // Reduced default speed for better performance
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 50}%`]); // Reduced movement

  return (
    <motion.div
      ref={ref}
      style={{ y, willChange: "transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Journey Timeline Component
interface JourneyTimelineProps {
  phases: Array<{
    phase: string;
    title: string;
    period: string;
    description: string;
    challenge?: string;
    growth: string;
    keyMoment?: string;
  }>;
  className?: string;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  phases,
  className = "",
}) => {
  const [activePhase, setActivePhase] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-phase") || "0"
            );
            setActivePhase(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    const phases = containerRef.current?.querySelectorAll("[data-phase]");
    phases?.forEach((phase) => observer.observe(phase));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Timeline Line */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary to-primary/20" />

      {phases.map((phase, index) => (
        <motion.div
          key={index}
          data-phase={index}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative pl-12 md:pl-20 pb-16 last:pb-0"
        >
          {/* Timeline Dot */}
          <motion.div
            className={`absolute left-2 md:left-6 w-4 h-4 rounded-full border-4 transition-all duration-300 ${
              activePhase >= index
                ? "bg-primary border-primary shadow-lg scale-125"
                : "bg-background border-muted"
            }`}
            animate={{
              scale: activePhase >= index ? 1.25 : 1,
              boxShadow:
                activePhase >= index
                  ? "0 0 20px rgba(var(--primary), 0.4)"
                  : "none",
            }}
          />

          {/* Content */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
              <h3 className="text-xl font-bold text-foreground">
                {phase.title}
              </h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                <Clock className="w-3 h-3 mr-1" />
                {phase.period}
              </span>
            </div>

            <p className="text-base text-foreground/80">{phase.description}</p>

            {phase.challenge && (
              <div className="bg-orange-50/50 dark:bg-orange-900/10 p-4 rounded-lg border-l-4 border-orange-400">
                <p className="text-sm text-foreground/70">
                  <strong>Challenge:</strong> {phase.challenge}
                </p>
              </div>
            )}

            <div className="bg-green-50/50 dark:bg-green-900/10 p-4 rounded-lg border-l-4 border-green-400">
              <p className="text-sm text-foreground/70">
                <strong>Growth:</strong> {phase.growth}
              </p>
            </div>

            {phase.keyMoment && (
              <div className="bg-purple-50/50 dark:bg-purple-900/10 p-4 rounded-lg border-l-4 border-purple-400">
                <p className="text-sm text-foreground/70 italic">
                  <strong>Key Moment:</strong> {phase.keyMoment}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Philosophy Cards Component
interface PhilosophyCardsProps {
  philosophies: Array<{
    principle: string;
    description: string;
    example?: string;
    icon: string;
  }>;
  className?: string;
}

export const PhilosophyCards: React.FC<PhilosophyCardsProps> = ({
  philosophies,
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {philosophies.map((philosophy, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="group p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300"
        >
          <div className="flex items-start space-x-4">
            <span className="text-2xl" role="img" aria-label="Philosophy icon">
              {philosophy.icon}
            </span>
            <div className="space-y-3 flex-1">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {philosophy.principle}
              </h3>
              <p className="text-sm text-foreground/80">
                {philosophy.description}
              </p>
              {philosophy.example && (
                <p className="text-xs text-foreground/60 italic">
                  {philosophy.example}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Enhanced CTA Component
interface NarrativeCTAProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
}

export const NarrativeCTA: React.FC<NarrativeCTAProps> = ({
  title,
  description,
  href,
  icon,
  variant = "primary",
  className = "",
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return "bg-secondary/10 border-secondary/30 hover:border-secondary text-secondary";
      case "accent":
        return "bg-accent/10 border-accent/30 hover:border-accent text-accent";
      default:
        return "bg-primary/10 border-primary/30 hover:border-primary text-primary";
    }
  };

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={`group block p-6 rounded-xl border-2 transition-all duration-300 ${getVariantStyles()} ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold group-hover:scale-105 transition-transform origin-left">
            {title}
          </h3>
          <p className="text-sm opacity-80">{description}</p>
        </div>
        <motion.div
          className="flex-shrink-0"
          animate={{ x: 0 }}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          {icon || <ChevronRight className="w-5 h-5" />}
        </motion.div>
      </div>
    </motion.a>
  );
};

// Section Divider with Animation
interface SectionDividerProps {
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  className = "",
}) => {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true }}
      className={`h-px bg-gradient-to-r from-transparent via-border to-transparent my-16 ${className}`}
    />
  );
};
