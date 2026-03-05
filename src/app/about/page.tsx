"use client";

import { motion } from "framer-motion";
import {
  Download,
  Mail,
  Linkedin,
  Github,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useCallback } from "react";

// Components
import { AnimatedContainer } from "@/components/animations/AnimatedContainer";
import { CitySkylinesIllustration } from "@/components/illustrations/AboutPageIllustrations";
import { Container } from "@/components/layout/Container";
import { PrimaryCTA, SecondaryCTA } from "@/components/ui/CTAButton";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import {
  ReadingTimeEstimator,
  SectionNavigation,
  ProgressIndicator,
} from "@/components/ui/ReadingTimeEstimator";
import {
  ReadingProgress,
  StorySection,
  SectionDivider,
} from "@/components/ui/ScrollytellComponents";
import { useLoading } from "@/contexts/LoadingContext";

// Data
import {
  aboutPageContent,
  projectsInfo,
  workInfo,
} from "../../../config/about-content";
import { getCTA } from "../../../config/content-config";
import { personalInfo } from "../../../config/personal-info";
import {
  useScrollProgress,
  useSectionTracking,
  useSmoothScroll,
  useThemeAwareAnimations,
  useReadingTime,
} from "../../hooks/useScrollEffects";

// Types
interface StoryItem {
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
}

interface InterestItem {
  activity: string;
  description: string;
  connection?: string;
}

// Optimized Hooks - Import only what's needed

// Optimized content preparation with memoization
const prepareContentForReading = (content: typeof aboutPageContent) => {
  const sections = [
    content.storyArc.introduction,
    ...content.storyArc.journey,
    content.storyArc.currentState,
    content.storyArc.futureAspirations,
  ];

  return (
    sections
      .map(
        (section: StoryItem) =>
          section.content.join(" ") +
          (section.anecdote || "") +
          (section.highlight || "")
      )
      .join(" ") +
    content.workInfo.description +
    content.projectsInfo.description +
    content.offlineInfo.description
  );
};

const AboutPage: React.FC = () => {
  // Hooks with performance optimization
  const scrollProgress = useScrollProgress();
  const { theme, getThemeAnimations } = useThemeAwareAnimations();
  const { scrollToSection } = useSmoothScroll();
  const { isHydrated, isLoading } = useLoading();

  const isReady = isHydrated && !isLoading;

  // Reduced section IDs for better performance
  const sectionIds = useMemo(
    () => [
      "hero",
      "story-intro",
      "foundation-and-dreams",
      "enterprise-reality-check",
      "ai-awakening",
      "story-current",
      "story-future",
      "work-info",
      "projects-info",
      "offline-info",
      "connect",
    ],
    []
  );

  const { activeSection, completedSections } = useSectionTracking(sectionIds);

  // Content and reading time - memoized for performance
  const fullContent = useMemo(
    () => prepareContentForReading(aboutPageContent),
    []
  );
  useReadingTime(fullContent);

  // Navigation sections - memoized for performance
  const navigationSections = useMemo(
    () => [
      {
        id: "hero",
        title: "Introduction",
        completed: completedSections.has("hero"),
      },
      {
        id: "story-intro",
        title: "The Beginning",
        completed: completedSections.has("story-intro"),
      },
      {
        id: "foundation-and-dreams",
        title: "Foundation",
        completed: completedSections.has("foundation-and-dreams"),
      },
      {
        id: "enterprise-reality-check",
        title: "Enterprise Growth",
        completed: completedSections.has("enterprise-reality-check"),
      },
      {
        id: "ai-awakening",
        title: "AI Discovery",
        completed: completedSections.has("ai-awakening"),
      },
      {
        id: "story-current",
        title: "Present",
        completed: completedSections.has("story-current"),
      },
      {
        id: "story-future",
        title: "Future Vision",
        completed: completedSections.has("story-future"),
      },
      {
        id: "work-info",
        title: "Current Work",
        completed: completedSections.has("work-info"),
      },
      {
        id: "projects-info",
        title: "Projects",
        completed: completedSections.has("projects-info"),
      },
      {
        id: "offline-info",
        title: "Beyond the Screen",
        completed: completedSections.has("offline-info"),
      },
      {
        id: "connect",
        title: "Let's Connect",
        completed: completedSections.has("connect"),
      },
    ],
    [completedSections]
  );

  // Optimized Animation variants with reduced complexity and hydration handling
  const optimizedTextVariants = useMemo(() => {
    if (!isHydrated) {
      // Return static state during hydration
      return {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0 },
      };
    }

    if (isReady && theme) {
      return getThemeAnimations();
    }
    return {
      initial: { opacity: 0, y: 3 }, // Reduced movement
      animate: { opacity: 1, y: 0 },
      transition: { type: "tween", duration: 0.2, ease: "easeOut" }, // Faster
    };
  }, [getThemeAnimations, isReady, theme, isHydrated]);

  const heroImageVariants = useMemo(() => {
    if (!isHydrated) {
      return {
        initial: { scale: 1, opacity: 1 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0 },
      };
    }

    return {
      initial: { scale: 1.01, opacity: 0 }, // Reduced scale
      animate: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.3, ease: "easeOut" }, // Shortened duration
      },
    };
  }, [isHydrated]);

  // Memoized handlers
  const handleDownloadResume = useCallback(() => {
    try {
      // Create a link element and trigger download
      const link = document.createElement("a");
      link.href = personalInfo.resumeFile.path;
      link.download = personalInfo.resumeFile.downloadName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading resume:", error);
      // Fallback: open in new tab
      window.open(personalInfo.resumeFile.path, "_blank");
    }
  }, []);

  // Extract content data
  const { hero, storyArc, offlineInfo, connectInfo } = aboutPageContent;

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        {/* Progress Indicator */}
        <ProgressIndicator progress={scrollProgress} />

        {/* Reading Progress */}
        <ReadingProgress className="fixed top-16 left-0 right-0 z-40" />

        <main className="relative xl:flex">
          {/* Side Navigation (Desktop Only) - Hidden on Mobile & iPad */}
          <aside className="hidden xl:block xl:w-64 xl:flex-shrink-0 xl:ml-8">
            <div className="sticky top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-md border border-border/50 rounded-xl p-4 shadow-xl">
              <SectionNavigation
                sections={navigationSections}
                activeSection={activeSection}
                onSectionClick={scrollToSection}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0 xl:px-12 2xl:px-16">
            {/* Hero Section */}
            <section
              id="hero"
              className="min-h-screen flex items-center py-16 lg:py-20"
            >
              <Container size="xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
                  {/* Content Column */}
                  <AnimatedContainer
                    className="text-left order-2 md:order-2 xl:order-1"
                    delay={0.2}
                  >
                    <motion.h1
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
                      initial={optimizedTextVariants.initial}
                      animate={optimizedTextVariants.animate}
                      transition={optimizedTextVariants.transition}
                    >
                      {hero.greeting}
                    </motion.h1>

                    <motion.p
                      className="text-lg md:text-xl text-foreground/80 mb-6 max-w-2xl"
                      initial={optimizedTextVariants.initial}
                      animate={optimizedTextVariants.animate}
                      transition={{
                        ...optimizedTextVariants.transition,
                        delay: 0.1,
                      }}
                    >
                      {hero.introduction}
                    </motion.p>

                    <motion.p
                      className="text-base md:text-lg text-foreground/70 mb-8 max-w-xl"
                      initial={optimizedTextVariants.initial}
                      animate={optimizedTextVariants.animate}
                      transition={{
                        ...optimizedTextVariants.transition,
                        delay: 0.2,
                      }}
                    >
                      {hero.personalTouch}
                    </motion.p>

                    {/* Mobile & Tablet: Compact stats */}
                    <div className="block lg:hidden mb-8">
                      <div className="flex flex-wrap justify-start gap-4 text-sm">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                          📍 {personalInfo.location}
                        </span>
                        <span className="px-3 py-1 bg-accent/10 text-accent rounded-full">
                          ⚡ {personalInfo.availability}
                        </span>
                      </div>
                    </div>

                    {/* Reading Time (Mobile & Tablet: smaller) */}
                    <div className="block lg:hidden mb-6">
                      <ReadingTimeEstimator
                        content={fullContent}
                        className="text-sm justify-start"
                      />
                    </div>

                    {/* Desktop: Full reading time */}
                    <div className="hidden lg:block mb-8">
                      <ReadingTimeEstimator content={fullContent} />
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col lg:flex-row gap-4 justify-start">
                      <PrimaryCTA
                        aria-label="Download Resume"
                        onClick={handleDownloadResume}
                        icon={<Download size={18} />}
                        size="lg"
                        fullWidth
                        className="md:w-auto"
                      >
                        {getCTA("primary", "downloadResume")}
                      </PrimaryCTA>

                      <SecondaryCTA
                        aria-label="Read My Story"
                        onClick={() => scrollToSection("story-intro")}
                        icon={<BookOpen size={18} />}
                        size="lg"
                        fullWidth
                        className="md:w-auto"
                      >
                        {getCTA("primary", "readStory")}
                      </SecondaryCTA>
                    </div>
                  </AnimatedContainer>

                  {/* Profile Image Column */}
                  <motion.div
                    className="relative order-1 md:order-1 lg:order-2 flex justify-center lg:justify-end"
                    {...heroImageVariants}
                  >
                    <div className="relative">
                      {/* Mobile & Tablet: Smaller image */}
                      <div className="block lg:hidden">
                        <Image
                          src={personalInfo.images.profileImage.src}
                          alt={personalInfo.images.profileImage.alt}
                          width={200}
                          height={200}
                          className="rounded-full object-cover shadow-2xl"
                          priority
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGBobHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyEkJzgTTLPz0kNB7hc4PB0rXBK7+fWa2yqKSs6v//Z"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                          }}
                          style={{
                            filter:
                              "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))",
                          }}
                        />
                      </div>

                      {/* Desktop: Larger image */}
                      <div className="hidden lg:block">
                        <Image
                          src={personalInfo.images.profileImage.src}
                          alt={personalInfo.images.profileImage.alt}
                          width={400}
                          height={400}
                          className="rounded-full object-cover shadow-2xl"
                          priority
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGBobHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyEkJzgTTLPz0kNB7hc4PB0rXBK7+fWa2yqKSs6v//Z"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                          }}
                          style={{
                            filter:
                              "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))",
                          }}
                        />
                      </div>

                      {/* Image not found fallback */}
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-primary/10 rounded-full text-primary text-4xl lg:text-6xl font-bold"
                        style={{ display: "none" }}
                        id="profile-fallback"
                      >
                        YP
                      </div>

                      {/* Animated decorative elements */}
                      <motion.div
                        className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.div
                        className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/20 rounded-full blur-xl"
                        animate={{
                          scale: [1.2, 1, 1.2],
                          opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1,
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
              </Container>
            </section>

            {/* Introduction Section */}
            <section id="story-intro" className="py-16 md:py-20">
              <Container size="xl">
                <StorySection
                  id="story-intro"
                  title={storyArc.introduction.title}
                  subtitle={storyArc.introduction.subtitle}
                  content={storyArc.introduction.content}
                  anecdote={storyArc.introduction.anecdote}
                  highlight={storyArc.introduction.highlight}
                  emotion={storyArc.introduction.emotion}
                  visualCue={storyArc.introduction.visualCue}
                />
              </Container>
            </section>

            <SectionDivider />

            {/* Journey Sections */}
            {storyArc.journey.map((section: StoryItem, index: number) => (
              <section
                key={section.id}
                id={section.id}
                className={`py-16 md:py-20 ${
                  index % 2 === 1
                    ? "bg-gradient-to-br from-accent/5 to-primary/5"
                    : ""
                }`}
              >
                <Container size="xl">
                  <StorySection
                    id={section.id}
                    title={section.title}
                    subtitle={section.subtitle}
                    content={section.content}
                    anecdote={section.anecdote}
                    highlight={section.highlight}
                    emotion={section.emotion}
                    visualCue={section.visualCue}
                  />
                </Container>
                {index < storyArc.journey.length - 1 && <SectionDivider />}
              </section>
            ))}

            <SectionDivider />

            {/* Current State */}
            <section id="story-current" className="py-16 md:py-20">
              <Container size="xl">
                <StorySection
                  id="story-current"
                  title={storyArc.currentState.title}
                  subtitle={storyArc.currentState.subtitle}
                  content={storyArc.currentState.content}
                  anecdote={storyArc.currentState.anecdote}
                  highlight={storyArc.currentState.highlight}
                  emotion={storyArc.currentState.emotion}
                  visualCue={storyArc.currentState.visualCue}
                />
              </Container>
            </section>

            {/* Future Aspirations */}
            <section
              id="story-future"
              className="py-16 md:py-20 bg-gradient-to-br from-accent/5 to-primary/5"
            >
              <Container size="xl">
                <StorySection
                  id="story-future"
                  title={storyArc.futureAspirations.title}
                  subtitle={storyArc.futureAspirations.subtitle}
                  content={storyArc.futureAspirations.content}
                  anecdote={storyArc.futureAspirations.anecdote}
                  highlight={storyArc.futureAspirations.highlight}
                  emotion={storyArc.futureAspirations.emotion}
                  visualCue={storyArc.futureAspirations.visualCue}
                />
              </Container>
            </section>

            <SectionDivider />

            {/* Work Info Section */}
            <section id="work-info" className="py-16 md:py-20">
              <Container size="xl">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
                  <div className="flex-1 space-y-8">
                    <AnimatedContainer>
                      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        {workInfo.title}
                      </h2>
                      <p className="text-lg text-foreground/80 mb-8">
                        {workInfo.description}
                      </p>
                    </AnimatedContainer>

                    <AnimatedContainer delay={0.2}>
                      <div className="space-y-4">
                        <h3 className="text-2xl font-semibold text-foreground mb-4">
                          Key Achievements
                        </h3>
                        <ul className="space-y-3">
                          {workInfo.highlights.map(
                            (highlight: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-start space-x-3"
                              >
                                <span
                                  className="text-primary mt-1 text-lg"
                                  role="img"
                                  aria-label="Checkmark"
                                >
                                  ✓
                                </span>
                                <span className="text-foreground/80">
                                  {highlight}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </AnimatedContainer>

                    <AnimatedContainer delay={0.4}>
                      <div className="p-6 rounded-lg bg-primary/10 border-l-4 border-primary/30 backdrop-blur-sm">
                        <p className="text-base text-foreground/80 italic">
                          {workInfo.approach}
                        </p>
                      </div>
                    </AnimatedContainer>

                    {workInfo.link && (
                      <AnimatedContainer delay={0.6}>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Link
                            href="/resume"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                          >
                            View Full Resume
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </AnimatedContainer>
                    )}
                  </div>
                </div>
              </Container>
            </section>

            <SectionDivider />

            {/* Projects Info Section */}
            <section
              id="projects-info"
              className="py-16 md:py-20 bg-gradient-to-br from-secondary/5 to-accent/5"
            >
              <Container size="xl">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
                  <div className="flex-1 space-y-8">
                    <AnimatedContainer>
                      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        {projectsInfo.title}
                      </h2>
                      <p className="text-lg text-foreground/80 mb-8">
                        {projectsInfo.description}
                      </p>
                    </AnimatedContainer>

                    <AnimatedContainer delay={0.2}>
                      <div className="p-6 rounded-lg bg-accent/10 border-l-4 border-accent/30 backdrop-blur-sm">
                        <p className="text-base text-foreground/80 italic">
                          {projectsInfo.passion}
                        </p>
                      </div>
                    </AnimatedContainer>

                    <AnimatedContainer delay={0.4}>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <a href={projectsInfo.link} rel="noopener noreferrer">
                          <PrimaryCTA
                            icon={<Github size={18} />}
                            size="lg"
                            className="w-full sm:w-auto"
                          >
                            Explore Projects
                          </PrimaryCTA>
                        </a>
                      </div>
                    </AnimatedContainer>
                  </div>
                </div>
              </Container>
            </section>

            <SectionDivider />

            {/* Offline Interests */}
            <section id="offline-info" className="py-16 md:py-20">
              <Container size="xl">
                {/* Mobile Travel Illustration - Displayed at top on mobile */}
                <div className="block lg:hidden mb-12">
                  <AnimatedContainer delay={0.2}>
                    <div className="flex justify-center">
                      <Image
                        src="/images/illustrations/travel2.png"
                        alt="Travel illustration"
                        width={300}
                        height={300}
                        className="opacity-90 drop-shadow-sm rounded-lg object-contain"
                      />
                    </div>
                  </AnimatedContainer>
                </div>

                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
                  {/* Content Side */}
                  <div className="flex-1 space-y-8">
                    <AnimatedContainer>
                      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        {offlineInfo.title}
                      </h2>
                      <p className="text-lg text-foreground/80 mb-8">
                        {offlineInfo.description}
                      </p>
                    </AnimatedContainer>

                    {offlineInfo.interests.map(
                      (interest: InterestItem, index: number) => (
                        <AnimatedContainer key={index} delay={index * 0.2}>
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <span
                                className="text-2xl"
                                role="img"
                                aria-label="Globe"
                              >
                                🌍
                              </span>
                              <h3 className="text-2xl font-semibold text-foreground">
                                {interest.activity}
                              </h3>
                            </div>
                            <p className="text-lg text-foreground/80 leading-relaxed">
                              {interest.description}
                            </p>
                            {interest.connection && (
                              <div className="p-4 rounded-lg bg-primary/10 border-l-4 border-primary/30 backdrop-blur-sm">
                                <p className="text-base text-foreground/70 italic">
                                  {interest.connection}
                                </p>
                              </div>
                            )}
                          </div>
                        </AnimatedContainer>
                      )
                    )}
                  </div>

                  {/* Desktop Illustrations Side - Hidden on mobile */}
                  <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:items-center lg:justify-start lg:pl-8 xl:pl-12">
                    <AnimatedContainer delay={0.3} className="mt-16">
                      <div className="relative w-full max-w-lg xl:max-w-xl">
                        {/* Background decoration for better theme integration - more subtle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-full blur-2xl scale-90 opacity-70" />
                        <div className="relative flex justify-center items-center">
                          <Image
                            src="/images/illustrations/travel2.png"
                            alt="Yogesh exploring new destinations and technologies"
                            width={450}
                            height={450}
                            className="opacity-90 drop-shadow-lg transition-all duration-500 hover:opacity-100 hover:scale-105 rounded-lg object-contain transform lg:translate-x-8"
                            priority
                          />
                        </div>
                      </div>
                    </AnimatedContainer>

                    {/* CitySkylinesIllustration can be a secondary, less prominent element or removed if too cluttered */}
                    <AnimatedContainer
                      delay={0.5}
                      className="mt-8 w-full max-w-md"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 via-transparent to-primary/5 rounded-lg blur-xl scale-100 opacity-60" />
                        <div className="relative flex justify-center p-2">
                          <CitySkylinesIllustration
                            size="lg"
                            className="opacity-70 drop-shadow-md transition-all duration-500 hover:opacity-80"
                          />
                        </div>
                      </div>
                    </AnimatedContainer>
                  </div>
                </div>

                {/* Mobile City Illustration - Displayed at bottom on mobile */}
                <div className="block lg:hidden mt-12">
                  <AnimatedContainer delay={0.6}>
                    <div className="flex justify-center">
                      <CitySkylinesIllustration
                        size="lg"
                        className="opacity-80 drop-shadow-sm"
                      />
                    </div>
                  </AnimatedContainer>
                </div>
              </Container>
            </section>

            {/* Connect Section */}
            <section
              id="connect"
              className="py-16 md:py-20 bg-gradient-to-br from-primary/5 to-accent/5"
            >
              <Container size="xl">
                <AnimatedContainer className="text-center space-y-8">
                  <div className="space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                      {connectInfo.title}
                    </h2>
                    <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                      {connectInfo.description}
                    </p>
                    <p className="text-base text-foreground/70 max-w-2xl mx-auto">
                      {connectInfo.invitation}
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-10 w-full md:w-auto">
                    <PrimaryCTA
                      href="/contact"
                      icon={<Mail size={18} />}
                      size="lg"
                      fullWidth
                      className="md:w-auto"
                    >
                      Send Email
                    </PrimaryCTA>

                    <SecondaryCTA
                      href={
                        personalInfo.socialLinks.find(
                          (link: { platform: string; url: string }) =>
                            link.platform === "LinkedIn"
                        )?.url
                      }
                      icon={<Linkedin size={18} />}
                      size="lg"
                      fullWidth
                      className="md:w-auto"
                    >
                      Connect on LinkedIn
                    </SecondaryCTA>

                    <SecondaryCTA
                      href={
                        personalInfo.socialLinks.find(
                          (link: { platform: string; url: string }) =>
                            link.platform === "GitHub"
                        )?.url
                      }
                      icon={<Github size={18} />}
                      size="lg"
                      fullWidth
                      className="md:w-auto"
                    >
                      View GitHub
                    </SecondaryCTA>
                  </div>
                </AnimatedContainer>
              </Container>
            </section>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default AboutPage;
