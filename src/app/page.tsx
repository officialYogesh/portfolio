"use client";

import { motion } from "framer-motion";
import { Mail, Users, Download, Briefcase, MapPin, Clock } from "lucide-react";
import { useState, useEffect } from "react";

import {
  AnimatedContainer,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations";
import { Container } from "@/components/layout";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Badge } from "@/components/ui/Badge";
import { PrimaryCTA, SecondaryCTA } from "@/components/ui/CTAButton";
import { useLoading } from "@/contexts/LoadingContext";

import {
  getCTA,
  getResponseTimePromise,
  contentConfig,
} from "../../config/content-config";
import {
  getRecruiterHooks,
  getProfessionalTitle,
  getHeroStats,
  getHeroDescription,
  getTechnologies,
  getTypingAnimationConfig,
  getAchievementSection,
  getProjectsSection,
  getContactSection,
} from "../../config/home-config";
import { personalInfo } from "../../config/personal-info";
import { getFeaturedProjects } from "../../config/projects";

// Optimized typing animation hook with reduced CPU usage
const useTypingAnimation = (texts: string[], speed = 80, delay = 4000) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Wait for client hydration before starting animations
  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let timeout: NodeJS.Timeout;
    let rafId: number;

    const updateText = () => {
      if (isTyping) {
        const fullText = texts[currentTextIndex];
        if (currentText.length < fullText.length) {
          rafId = requestAnimationFrame(() => {
            timeout = setTimeout(() => {
              setCurrentText(fullText.slice(0, currentText.length + 1));
            }, speed);
          });
        } else {
          timeout = setTimeout(() => setIsTyping(false), delay);
        }
      } else {
        if (currentText.length > 0) {
          rafId = requestAnimationFrame(() => {
            timeout = setTimeout(() => {
              setCurrentText(currentText.slice(0, -1));
            }, speed / 3); // Faster deletion
          });
        } else {
          timeout = setTimeout(() => {
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
            setIsTyping(true);
          }, 500);
        }
      }
    };

    updateText();

    return () => {
      clearTimeout(timeout);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [currentText, currentTextIndex, isTyping, texts, speed, delay, isClient]);

  return isClient ? currentText : texts[0]; // Fallback to first text during SSR
};

export default function Home() {
  const { isHydrated, isLoading } = useLoading();
  const featuredProjects = getFeaturedProjects();
  const recruiterHooks = getRecruiterHooks();
  const typingConfig = getTypingAnimationConfig();
  const isReady = isHydrated && !isLoading;

  const currentHook = useTypingAnimation(
    recruiterHooks,
    typingConfig.speed,
    typingConfig.delay
  );

  return (
    <>
      {/* Minimal Background */}
      <div className="fixed inset-0 -z-10 bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-background to-accent/3" />
      </div>

      <Container className="relative">
        {/* Hero Section - Recruiter-Focused */}
        <section className="py-12">
          <div className="max-w-6xl">
            {/* Recruiter Hook */}
            <AnimatedContainer variant="slide" direction="up" delay={0.1}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <p className="text-lg md:text-xl text-foreground/80 font-medium">
                  {isReady ? currentHook : recruiterHooks[0]}
                  {isReady && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="text-accent ml-1"
                    >
                      |
                    </motion.span>
                  )}
                </p>
              </motion.div>
            </AnimatedContainer>

            {/* Professional Identity Statement */}
            <AnimatedContainer
              variant="slide"
              direction="up"
              delay={0.3}
              className="!mb-8"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: isReady ? 0.3 : 0 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight"
              >
                <span className="text-primary font-extrabold">
                  {getProfessionalTitle().prefix}
                </span>{" "}
                {getProfessionalTitle().main}{" "}
                <span className="text-accent font-extrabold">
                  {getProfessionalTitle().specialization}
                </span>
              </motion.h1>
            </AnimatedContainer>

            {/* Quick Stats for Recruiters */}
            <AnimatedContainer variant="slide" direction="up" delay={0.5}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: isReady ? 0.5 : 0 }}
                className="mb-8"
              >
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base text-foreground/70">
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Briefcase className="h-5 w-5 text-blue-500" />
                    <span>
                      <strong className="text-foreground">
                        {getHeroStats().experience}
                      </strong>{" "}
                      experience
                    </span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <motion.div
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={
                        isReady
                          ? {
                              scale: [1, 1.3, 1],
                              opacity: [1, 0.7, 1],
                            }
                          : {
                              scale: 1,
                              opacity: 1,
                            }
                      }
                      transition={{
                        duration: 2,
                        repeat: isReady ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                    />
                    <span className="text-green-500 font-semibold">
                      {getHeroStats().availabilityStatus}
                    </span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-foreground/70">
                      {personalInfo.location}
                    </span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-foreground/70">
                      {getHeroStats().availabilityMessage}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatedContainer>

            {/* Core Tech Stack & CTAs */}
            <AnimatedContainer variant="slide" direction="up" delay={0.7}>
              <div className="mb-8">
                <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
                  <strong className="text-foreground">
                    {getHeroDescription().education}
                  </strong>{" "}
                  {getHeroDescription().trackRecord.text}{" "}
                  {getHeroDescription().trackRecord.highlights.map(
                    (highlight, index) => (
                      <span key={index}>
                        <span
                          className={`text-${highlight.type} font-semibold`}
                        >
                          {highlight.text}
                        </span>
                        {index <
                          getHeroDescription().trackRecord.highlights.length -
                            1 && ", "}
                        {index ===
                          getHeroDescription().trackRecord.highlights.length -
                            2 && "and "}
                      </span>
                    )
                  )}{" "}
                  {getHeroDescription().conclusion}
                </p>

                {/* Key Technologies */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {getTechnologies().map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="px-3 py-1 text-sm font-medium"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Primary CTAs for Recruiters */}
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <PrimaryCTA
                    href={personalInfo.resumeFile.path}
                    icon={<Download className="h-5 w-5" />}
                    fullWidth
                    className="md:w-auto"
                  >
                    Download {personalInfo.resumeFile.displayName}
                  </PrimaryCTA>

                  <SecondaryCTA
                    to="/contact"
                    icon={<Mail className="h-5 w-5" />}
                    fullWidth
                    className="md:w-auto"
                  >
                    {getCTA("primary", "contact")}
                  </SecondaryCTA>
                </div>

                {/* Response Time Promise */}
                <p className="text-sm text-foreground/60 mt-4">
                  {getResponseTimePromise()}
                </p>
              </div>
            </AnimatedContainer>
          </div>
        </section>

        {/* Recent Achievement - Technical Credibility */}
        <section className="py-12">
          {/* Use slide animation directly on the container to avoid nested intersection observers */}
          <AnimatedContainer
            variant="slide"
            direction="up"
            threshold={0.2}
            duration={0.6}
          >
            <div className="bg-card/50 backdrop-blur border border-border rounded-2xl p-6 md:p-8 mb-16">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-3 h-3 bg-green-500 rounded-full"
                    animate={
                      isReady
                        ? {
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.8, 1],
                          }
                        : {
                            scale: 1,
                            opacity: 1,
                          }
                    }
                    transition={{
                      duration: 1.5,
                      repeat: isReady ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="text-sm font-medium text-primary">
                    {getAchievementSection().label}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-foreground">
                    {
                      getAchievementSection().title.split(
                        getAchievementSection().details
                      )[0]
                    }
                    <span className="text-green-500 font-bold">
                      {getAchievementSection().details}
                    </span>
                    {
                      getAchievementSection().title.split(
                        getAchievementSection().details
                      )[1]
                    }
                  </p>
                  <p className="text-sm text-foreground/60 mt-1">
                    {getAchievementSection().description}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedContainer>
        </section>

        {/* Technical Projects - Proof of Delivery */}
        <section className="py-12">
          <AnimatedContainer variant="slide" direction="up">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {getProjectsSection().title}
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl">
                {getProjectsSection().description}
              </p>
            </div>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <StaggerItem key={project.id}>
                  <div className="h-full group">
                    <ProjectCard project={project} index={index} />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Portfolio Link */}
            <div className="text-center mt-12">
              <SecondaryCTA
                to="/projects"
                size="lg"
                className="bg-transparent border-0 text-primary hover:text-accent"
              >
                {getProjectsSection().linkText}
              </SecondaryCTA>
            </div>
          </AnimatedContainer>
        </section>

        {/* Recruiter-Focused Contact Section */}
        <section className="py-12">
          <AnimatedContainer variant="slide" direction="up">
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {getContactSection().title}
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
                {getContactSection().description}{" "}
                {contentConfig.messaging.recruiting.availability}
              </p>

              {/* Enhanced CTA Layout - Single Row on Desktop */}
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-4xl mx-auto">
                <PrimaryCTA
                  href={personalInfo.resumeFile.path}
                  icon={<Download className="h-5 w-5" />}
                  fullWidth
                  className="md:flex-1 md:max-w-xs"
                >
                  Download {personalInfo.resumeFile.displayName}
                </PrimaryCTA>

                <SecondaryCTA
                  href={
                    personalInfo.socialLinks.find(
                      (link) => link.platform === "LinkedIn"
                    )?.url
                  }
                  icon={<Users className="h-5 w-5" />}
                  fullWidth
                  className="md:flex-1 md:max-w-xs"
                >
                  {getCTA("secondary", "viewProfile")}
                </SecondaryCTA>

                <SecondaryCTA
                  href="/contact"
                  icon={<Mail className="h-5 w-5" />}
                  fullWidth
                  className="md:flex-1 md:max-w-xs"
                >
                  {getCTA("secondary", "emailDirect")}
                </SecondaryCTA>
              </div>

              <p className="text-sm text-foreground/60 mt-6">
                {getResponseTimePromise()}
              </p>
            </div>
          </AnimatedContainer>
        </section>
      </Container>
    </>
  );
}
