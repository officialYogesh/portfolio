"use client";

import { motion } from "framer-motion";
import {
  Download,
  MapPin,
  Mail,
  Award,
  GraduationCap,
  Code,
  Database,
  Cloud,
  Container as ContainerIcon,
  Globe,
  Brain,
  Terminal,
  Settings,
  Layers,
  Server,
  Workflow,
} from "lucide-react";
import React from "react";

import { AnimatedContainer } from "@/components/animations/AnimatedContainer";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { Container } from "@/components/layout/Container";
import { PrimaryCTA } from "@/components/ui/CTAButton";

import { getCTA } from "../../../config/content-config";
import { education, achievements } from "../../../config/education";
import { personalInfo } from "../../../config/personal-info";

// Download functionality
const downloadResumePDF = () => {
  try {
    const link = document.createElement("a");
    link.href = personalInfo.resumeFile.path;
    link.download = personalInfo.resumeFile.downloadName;
    link.target = "_blank";
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading resume:", error);
    window.open(personalInfo.resumeFile.path, "_blank");
  }
};

// Key metrics for impact storytelling - Updated based on achievements
const impactMetrics = [
  {
    metric: "70%",
    description: "Dealership Workflow Automation",
    story: "LangChain-powered GenAI pipeline for Conversational Service AI",
  },
  {
    metric: "4x",
    description: "Platform Adoption Growth",
    story: "RBAC admin console with Okta integration at Vonage",
  },
  {
    metric: "80%",
    description: "Scheduling Time Reduction",
    story: "Service appointment workflow optimization",
  },
  {
    metric: "42%",
    description: "API Performance Enhancement",
    story: "RESTful backend services optimization",
  },
];

// Enhanced skills with icons and proper categorization - Updated based on current expertise
const technicalSkills = [
  // Frontend Technologies
  {
    name: "React/Next.js",
    icon: Code,
    level: 9,
    context: "Production-scale applications, modern hooks",
    category: "Frontend",
  },
  {
    name: "TypeScript",
    icon: Terminal,
    level: 9,
    context: "Strict typing, enterprise applications",
    category: "Frontend",
  },
  {
    name: "JavaScript",
    icon: Globe,
    level: 9,
    context: "ES6+, async/await, modern patterns",
    category: "Frontend",
  },

  // Backend Technologies
  {
    name: "Python/FastAPI",
    icon: Server,
    level: 9,
    context: "GenAI pipelines, high-performance APIs",
    category: "Backend",
  },
  {
    name: "Node.js/Express",
    icon: Settings,
    level: 8,
    context: "RESTful services, microservices",
    category: "Backend",
  },
  {
    name: "GraphQL",
    icon: Layers,
    level: 7,
    context: "Schema design, Apollo Server",
    category: "Backend",
  },

  // Cloud & DevOps
  {
    name: "AWS",
    icon: Cloud,
    level: 8,
    context: "Certified Cloud Practitioner, EC2, S3, Lambda",
    category: "Cloud",
  },
  {
    name: "Docker",
    icon: ContainerIcon,
    level: 8,
    context: "Multi-stage builds, production deployments",
    category: "DevOps",
  },
  {
    name: "CI/CD",
    icon: Workflow,
    level: 7,
    context: "GitHub Actions, automated deployments",
    category: "DevOps",
  },

  // Database
  {
    name: "PostgreSQL",
    icon: Database,
    level: 8,
    context: "Complex queries, performance optimization",
    category: "Database",
  },
  {
    name: "MongoDB",
    icon: Database,
    level: 7,
    context: "Document modeling, aggregation pipelines",
    category: "Database",
  },

  // AI/ML & LLM
  {
    name: "LangChain",
    icon: Brain,
    level: 9,
    context: "RAG systems, agent workflows, production LLM apps",
    category: "AI/ML",
  },
];

// FAANG-Aligned Core Strengths - Optimized for technical recruiters and hiring managers
const coreStrengths = [
  {
    icon: "🧠",
    title: "Systems Thinking & Scale",
    description:
      "I design and build resilient, scalable systems engineered for high performance. My experience includes architecting event-driven microservices and robust GenAI pipelines that process thousands of daily workflows. I excel at creating infrastructure that not only handles complexity but also enhances throughput and ensures reliability in high-concurrency environments.",
  },
  {
    icon: "📊",
    title: "Data-Driven Problem Solving",
    description:
      "I deliver quantifiable impact by treating software development as a science. I leverage metrics, A/B testing, and data-backed hypotheses to drive significant API performance gains, automate complex workflows, and boost platform adoption. I approach every challenge with the scientific rigor needed to achieve measurable and meaningful outcomes.",
  },
  {
    icon: "🚀",
    title: "Innovation & Technical Leadership",
    description:
      "I thrive on building with a forward-thinking vision. I have led the implementation of cutting-edge AI solutions using LangChain and RAG and have architected greenfield microservices that unify complex data streams to unlock new revenue opportunities. My passion lies in combining technical depth with creative problem-solving to drive the innovation that moves business forward.",
  },
  {
    icon: "⚡",
    title: "Ownership & Execution Excellence",
    description:
      "I take complete ownership of the entire development lifecycle, from initial concept to zero-downtime production deployment. With a Master’s in Computer Science and deep experience in CI/CD automation, I don't just write code—I deliver robust, business-critical solutions that scale. My focus is on execution, reliability, and delivering lasting value efficiently.",
  },
];

export default function ResumePage() {
  return (
    <>
      <Container className="py-8 md:py-16">
        {/* Hero Section - The "6-Second Hook" */}
        <AnimatedContainer delay={0.1} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {personalInfo.name}
            </h1>
            <p className="text-xl md:text-2xl text-primary font-medium mb-4">
              Software Development Engineer • AI/ML Systems • Full-Stack
              Architecture
            </p>

            {/* Quick Contact & Download */}
            <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-6 justify-center items-center my-8">
              <PrimaryCTA
                onClick={downloadResumePDF}
                icon={<Download className="h-5 w-5" />}
                size="lg"
                fullWidth
                className="md:w-auto"
              >
                {getCTA("primary", "downloadResume")}
              </PrimaryCTA>

              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{personalInfo.location}</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <a
                  href="/contact"
                  className="hover:text-primary transition-colors !min-h-0 leading-none"
                >
                  Send a Message
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatedContainer>

        {/* Technical Expertise - Moved to top */}
        <AnimatedContainer delay={0.2} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Technical Stack & Proficiency
            </h2>
            <p className="text-muted-foreground">
              Production-grade technologies with demonstrated expertise in
              high-scale environments
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {technicalSkills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <StaggerItem key={index}>
                    <motion.div
                      className="p-4 md:p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base md:text-lg font-semibold text-foreground truncate">
                            {skill.name}
                          </h3>
                          <p className="text-xs text-primary font-medium">
                            {skill.category}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {skill.context}
                      </p>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </AnimatedContainer>

        {/* What I Do Best - Human Connection */}
        <AnimatedContainer delay={0.3} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Core Competencies
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The leadership principles and technical excellence I use to build
              impactful technology.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coreStrengths.map((strength, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 h-full"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{strength.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {strength.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {strength.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </AnimatedContainer>

        {/* Impact Metrics - Social Proof */}
        <AnimatedContainer delay={0.4} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Quantifiable Business Impact
            </h2>
            <p className="text-muted-foreground">
              Data-driven results that demonstrate scalable engineering
              excellence
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((item, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="text-center p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {item.metric}
                  </div>
                  <div className="text-sm font-medium text-foreground mb-2">
                    {item.description}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.story}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatedContainer>

        {/* Education & Credentials - Trust Builders */}
        <AnimatedContainer delay={0.5} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Foundation & Growth
            </h2>
            <p className="text-muted-foreground">Continuous learning journey</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Education */}
              <StaggerItem>
                <div className="p-6 md:p-8 rounded-2xl bg-card border border-border h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      Education
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {education.map((edu, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-primary/20 pl-4"
                      >
                        <h4 className="font-semibold text-foreground text-sm md:text-base">
                          {edu.degree} in {edu.field}
                        </h4>
                        <p className="text-primary text-sm md:text-base">
                          {edu.institution}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {edu.startDate.split("-")[0]} -{" "}
                          {edu.endDate.split("-")[0]}
                        </p>
                        {edu.gpa && (
                          <p className="text-sm text-muted-foreground">
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>

              {/* Key Achievements */}
              <StaggerItem>
                <div className="p-6 md:p-8 rounded-2xl bg-card border border-border h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      Recognition
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-primary/20 pl-4"
                      >
                        <h4 className="font-semibold text-foreground text-sm md:text-base">
                          {achievement.title}
                        </h4>
                        <p className="text-primary text-sm md:text-base">
                          {achievement.organization || achievement.category}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {achievement.date.split("-")[0]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </AnimatedContainer>
      </Container>
    </>
  );
}
