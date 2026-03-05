"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  Trophy,
  ExternalLink,
  PlayCircle,
  Target,
  AlertCircle,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Github,
  BookOpen,
  FileText,
  TrendingUp,
  BarChart,
  Layers,
  Zap,
  Film,
  Smartphone,
  Moon,
  Map,
  Table,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import { AnimatedContainer } from "@/components/animations/AnimatedContainer";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PrimaryCTA, SecondaryCTA } from "@/components/ui/CTAButton";

import { Project, ProjectLink } from "../../../../config/projects";

interface ProjectDetailClientProps {
  project: Project;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Check if thumbnail is a video file
  const isVideo =
    project.thumbnail &&
    (project.thumbnail.endsWith(".mp4") ||
      project.thumbnail.endsWith(".webm") ||
      project.thumbnail.endsWith(".mov"));

  // Check if gallery contains duplicate content (same as thumbnail)
  const hasDuplicateGalleryContent = project.screenshots?.some(
    (screenshot) => screenshot === project.thumbnail
  );

  // Gallery functionality
  const currentImageIndex = selectedImage ?? 0;

  const getFeatureIcon = (iconName?: string) => {
    switch (iconName) {
      case "target":
        return <Target className="w-6 h-6 text-blue-500" />;
      case "file-text":
        return <FileText className="w-6 h-6 text-green-500" />;
      case "trending-up":
        return <TrendingUp className="w-6 h-6 text-purple-500" />;
      case "bar-chart":
        return <BarChart className="w-6 h-6 text-orange-500" />;
      case "layers":
        return <Layers className="w-6 h-6 text-indigo-500" />;
      case "zap":
        return <Zap className="w-6 h-6 text-yellow-500" />;
      case "film":
        return <Film className="w-6 h-6 text-pink-500" />;
      case "smartphone":
        return <Smartphone className="w-6 h-6 text-cyan-500" />;
      case "map":
        return <Map className="w-6 h-6 text-emerald-500" />;
      case "moon":
        return <Moon className="w-6 h-6 text-slate-500" />;
      case "table":
        return <Table className="w-6 h-6 text-violet-500" />;
      default:
        return <Target className="w-6 h-6 text-primary" />;
    }
  };

  const getLinkIcon = (type: ProjectLink["type"]) => {
    switch (type) {
      case "demo":
        return <ExternalLink className="w-4 h-4" />;
      case "github":
        return <Github className="w-4 h-4" />;
      case "case-study":
        return <BookOpen className="w-4 h-4" />;
      case "documentation":
        return <FileText className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  const openGallery = (imageIndex: number) => {
    setSelectedImage(imageIndex);
  };

  const closeGallery = () => {
    setSelectedImage(null);
  };

  const navigateGallery = (direction: "prev" | "next") => {
    if (selectedImage === null) return;

    if (direction === "prev") {
      setSelectedImage(
        selectedImage === 0 ? project.screenshots.length - 1 : selectedImage - 1
      );
    } else {
      setSelectedImage(
        selectedImage === project.screenshots.length - 1 ? 0 : selectedImage + 1
      );
    }
  };

  // Get category info
  const categoryInfo = {
    displayName: project.category.replace("-", " ").toUpperCase(),
  };

  // Animation variants
  const galleryItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Back to Projects Button - sticky for easier navigation */}
      <div className="sticky top-[72px] flex justify-end z-30 px-4 md:px-8">
        <SecondaryCTA to="/projects" icon={<ArrowLeft className="w-4 h-4" />}>
          All Projects
        </SecondaryCTA>
      </div>

      {/* Hero Section - Conditional and uses project.thumbnail */}
      <section className="py-20 lg:py-28">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Hero Image/Video Preview - Conditional */}
            {project.thumbnail && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8 rounded-2xl overflow-hidden bg-muted/20 relative flex items-center justify-center min-h-[300px] max-h-[600px]"
              >
                {isVideo ? (
                  <video
                    src={project.thumbnail}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto object-contain max-h-[600px] rounded-2xl"
                    style={{
                      filter: "contrast(1.1) saturate(1.05) brightness(0.95)",
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={project.thumbnail}
                    alt={`${project.title} thumbnail`}
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    className="w-full h-auto object-contain max-h-[600px] rounded-2xl"
                    onError={(e) => {
                      // Hide the image on error and show a placeholder instead
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                    style={{
                      filter: "contrast(1.1) saturate(1.05) brightness(0.95)",
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 rounded-2xl" />
                <div className="absolute top-6 left-6 z-10">
                  <Badge
                    variant="default"
                    className="bg-primary text-primary-foreground font-bold shadow-2xl border-2 border-white/30 text-sm px-4 py-2"
                  >
                    {categoryInfo.displayName}
                  </Badge>
                </div>
                <div className="absolute top-6 right-6 flex gap-2 z-10">
                  <Badge
                    variant="default"
                    className="bg-accent text-accent-foreground font-bold shadow-2xl border-2 border-white/30 text-sm px-4 py-2"
                  >
                    {project.status.replace("-", " ").toUpperCase()}
                  </Badge>
                  {project.featured && (
                    <Badge
                      variant="default"
                      className="bg-yellow-500 text-black font-bold shadow-2xl border-2 border-white/30 text-sm px-4 py-2"
                    >
                      ⭐ Featured
                    </Badge>
                  )}
                </div>
              </motion.div>
            )}

            {/* Project Title and Description */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
                  {project.title}
                </h1>
                <p className="text-xl md:text-2xl text-muted leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>

              {/* Project Meta */}
              <div className="flex flex-wrap gap-6 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(project.startDate).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                    {project.endDate &&
                      ` - ${new Date(project.endDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          year: "numeric",
                        }
                      )}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Team of {project.teamSize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>{project.role}</span>
                </div>
              </div>

              {/* Project Links */}
              <div className="flex flex-col md:flex-row w-full gap-3">
                {project.links.map((link, index) => {
                  const CtaComponent = index === 0 ? PrimaryCTA : SecondaryCTA;
                  return (
                    <CtaComponent
                      key={index}
                      href={link.url}
                      icon={getLinkIcon(link.type)}
                      size="lg"
                      className="w-full md:w-auto"
                      aria-label={link.label}
                    >
                      {link.label}
                    </CtaComponent>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Project Overview and Objectives */}
      <section className="py-16 lg:py-20">
        <Container>
          <StaggerContainer>
            <StaggerItem>
              <div className="max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                  Project Overview
                </h2>
                <div className="prose prose-lg max-w-none text-muted">
                  <p className="text-lg leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>
              </div>
            </StaggerItem>

            {/* Project Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <StaggerItem>
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Key Metrics & Achievements
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {project.metrics.map((metric, index) => (
                      <Card key={index} className="p-6 text-center">
                        <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                          {metric.value}
                        </div>
                        <div className="text-sm text-muted">{metric.label}</div>
                      </Card>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            )}
          </StaggerContainer>
        </Container>
      </section>

      {/* Technology Stack - Enhanced with proper categorization and icons */}
      <section className="py-16 lg:py-20 bg-card/30">
        <Container>
          <AnimatedContainer variant="fade">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Technology Stack
              </h2>
              <p className="text-lg text-muted max-w-2xl mx-auto">
                Technologies and tools used to bring this project to life
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              {/* Group technologies by category */}
              {(() => {
                const categorizedTechs = project.technologies.reduce(
                  (acc, tech) => {
                    if (!acc[tech.category]) {
                      acc[tech.category] = [];
                    }
                    acc[tech.category].push(tech);
                    return acc;
                  },
                  {} as Record<string, typeof project.technologies>
                );

                const categoryOrder = [
                  "frontend",
                  "backend",
                  "database",
                  "cloud",
                  "tools",
                  "mobile",
                  "testing",
                ];
                const orderedCategories = categoryOrder.filter(
                  (cat) => categorizedTechs[cat]
                );

                return orderedCategories.map((category) => {
                  const categoryConfig = {
                    frontend: {
                      name: "Frontend",
                      icon: "🎨",
                      color: "text-blue-600 dark:text-blue-400",
                    },
                    backend: {
                      name: "Backend",
                      icon: "⚙️",
                      color: "text-green-600 dark:text-green-400",
                    },
                    database: {
                      name: "Database",
                      icon: "🗄️",
                      color: "text-purple-600 dark:text-purple-400",
                    },
                    cloud: {
                      name: "Cloud & Hosting",
                      icon: "☁️",
                      color: "text-cyan-600 dark:text-cyan-400",
                    },
                    tools: {
                      name: "Tools & Utilities",
                      icon: "🔧",
                      color: "text-orange-600 dark:text-orange-400",
                    },
                    mobile: {
                      name: "Mobile",
                      icon: "📱",
                      color: "text-indigo-600 dark:text-indigo-400",
                    },
                    testing: {
                      name: "Testing",
                      icon: "🧪",
                      color: "text-pink-600 dark:text-pink-400",
                    },
                  };

                  const config =
                    categoryConfig[category as keyof typeof categoryConfig];
                  if (!config) return null;

                  // Function to get technology icon - Actual SVG logos without containers
                  const getTechIcon = (
                    techName: string
                  ): React.ReactElement => {
                    // Define mapping of technology names to logo file names
                    const logoMap: Record<string, string> = {
                      React: "react.svg",
                      "Next.js": "nextjs.svg",
                      TypeScript: "typescript.svg",
                      JavaScript: "javascript.svg",
                      "Node.js": "nodejs.svg",
                      MongoDB: "mongodb.svg",
                      PostgreSQL: "postgresql.svg",
                      Docker: "docker.svg",
                      "Tailwind CSS": "tailwindcss.svg",
                      Python: "python.svg",
                      HTML5: "html5.svg",
                      CSS3: "css3.svg",
                      Git: "git.svg",
                      Unity: "unity.svg",
                      "C#": "csharp.svg",
                      Android: "android.svg",
                      iOS: "apple.svg",
                      Firebase: "firebase.svg",
                      Supabase: "supabase.svg",
                      OpenAI: "openai.svg",
                      Claude: "claude.svg",
                      "Material-UI": "materialui.svg",
                      "Chart.js": "chartjs.svg", // Using React as fallback
                      "D3.js": "d3js.svg",
                      Axios: "axios.svg",
                      Vercel: "vercel.svg",
                      LangChain: "langchain-color.svg", // Using Python as fallback since LangChain is Python-based
                      "Gemini 2.0 Flash": "gemini.svg", // Using Gemini logo
                      Gemini: "gemini.svg", // Using Gemini logo
                      "React Simple Maps": "react.svg", // Using React as fallback
                      "Game Design": "unity.svg", // Using Unity as fallback for game design
                    };

                    // Get the logo file name, fallback to a default if not found
                    const logoFile = logoMap[techName];

                    if (logoFile) {
                      return (
                        <Image
                          src={`/images/logos/${logoFile}`}
                          alt={`${techName} logo`}
                          width={64}
                          height={64}
                          className="w-16 h-16 object-contain"
                        />
                      );
                    }

                    // Fallback to a simple icon for unmapped technologies
                    return (
                      <div className="w-16 h-16 bg-[#718096] rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        🔹
                      </div>
                    );
                  };

                  return (
                    <div key={category} className="mb-16">
                      <div className="flex items-center gap-3 mb-8">
                        <span className="text-2xl">{config.icon}</span>
                        <h3 className={`text-xl font-semibold ${config.color}`}>
                          {config.name}
                        </h3>
                      </div>

                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-8">
                        {categorizedTechs[category].map((tech, index) => (
                          <motion.div
                            key={index}
                            className="flex flex-col items-center text-center group cursor-default"
                            whileHover={{
                              scale: 1.1,
                              y: -8,
                              transition: {
                                type: "spring",
                                stiffness: 400,
                                damping: 17,
                              },
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: index * 0.05,
                              duration: 0.3,
                              ease: "easeOut",
                            }}
                          >
                            <motion.h4
                              className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300 mb-3"
                              whileHover={{
                                scale: 1.05,
                                transition: {
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 17,
                                },
                              }}
                            >
                              {tech.name}
                            </motion.h4>
                            <motion.div
                              className="group-hover:shadow-xl transition-shadow duration-300"
                              whileHover={{
                                rotate: [0, -10, 10, 0],
                                transition: {
                                  duration: 0.5,
                                  ease: "easeInOut",
                                },
                              }}
                            >
                              {getTechIcon(tech.name)}
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </AnimatedContainer>
        </Container>
      </section>

      {/* Key Features */}
      <section className="py-16 lg:py-20">
        <Container>
          <StaggerContainer>
            <StaggerItem className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-16 text-center">
                Key Features
              </h2>
            </StaggerItem>

            <div className="grid md:grid-cols-2 gap-8">
              {project.features.map((feature, index) => (
                <StaggerItem key={index}>
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        {getFeatureIcon(feature.icon)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-muted leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </section>

      {/* Screenshot Gallery - Conditionally rendered only if no duplicate content */}
      {project.screenshots &&
        project.screenshots.length > 0 &&
        !hasDuplicateGalleryContent && (
          <section className="py-16 lg:py-20 bg-card/30">
            <Container>
              <AnimatedContainer variant="fade">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Project Gallery
                  </h2>
                  <p className="text-lg text-muted">
                    Screenshots and visuals from the project
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.screenshots.map((screenshot, index) => {
                    const isScreenshotVideo =
                      screenshot.endsWith(".mp4") ||
                      screenshot.endsWith(".webm") ||
                      screenshot.endsWith(".mov");

                    return (
                      <motion.div
                        key={index}
                        variants={galleryItemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 cursor-pointer group"
                        onClick={() => openGallery(index)}
                      >
                        {isScreenshotVideo ? (
                          <video
                            src={screenshot}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                            <PlayCircle className="w-12 h-12 text-primary/60" />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </AnimatedContainer>
            </Container>
          </section>
        )}

      {/* Challenges and Solutions */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <StaggerContainer>
              <StaggerItem className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-16 text-center">
                  Challenges & Solutions
                </h2>
              </StaggerItem>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Challenges */}
                <StaggerItem>
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-warning" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        Challenges
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {project.challenges.map((challenge, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                          <p className="text-muted leading-relaxed">
                            {challenge}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </StaggerItem>

                {/* Solutions */}
                <StaggerItem>
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-success" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        Solutions
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {project.solutions.map((solution, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                          <p className="text-muted leading-relaxed">
                            {solution}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              </div>
            </StaggerContainer>
          </div>
        </Container>
      </section>

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeGallery}
          >
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateGallery("prev");
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateGallery("next");
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Media Display */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-7xl max-h-full w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const currentScreenshot =
                  project.screenshots[currentImageIndex];
                const isModalVideo =
                  currentScreenshot.endsWith(".mp4") ||
                  currentScreenshot.endsWith(".webm") ||
                  currentScreenshot.endsWith(".mov");

                if (isModalVideo) {
                  return (
                    <video
                      src={currentScreenshot}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      className="max-w-full max-h-full rounded-lg"
                    >
                      Your browser does not support the video tag.
                    </video>
                  );
                } else {
                  return (
                    <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg p-8 text-center text-white/60">
                      <PlayCircle className="w-24 h-24 mx-auto mb-4" />
                      <p className="text-lg">Screenshot Preview</p>
                      <p className="text-sm opacity-60 mt-2">
                        {currentImageIndex + 1} of {project.screenshots.length}
                      </p>
                    </div>
                  );
                }
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
