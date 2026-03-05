"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Archive,
  FileImage,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useCallback, useEffect } from "react";

import { useLoading } from "@/contexts/LoadingContext";

import { Project, ProjectTechnology } from "../../../config/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  delay?: number;
}

// Technology category color mapping
const getCategoryColor = (category: ProjectTechnology["category"]) => {
  const colors = {
    frontend:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    backend:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    database:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    tools:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    cloud: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
    testing: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
    mobile:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  };
  return (
    colors[category] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
  );
};

// Status indicator component
const StatusIndicator: React.FC<{ status: Project["status"] }> = ({
  status,
}) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a placeholder or null during SSR to avoid hydration mismatch
    return <div className="h-6 w-20 bg-muted rounded-full animate-pulse"></div>;
  }

  const statusConfig = {
    completed: {
      icon: CheckCircle,
      text: "Completed",
      className:
        "text-white bg-green-600 shadow-2xl border-2 border-white/30 font-bold",
    },
    "in-progress": {
      icon: Clock,
      text: "In Progress",
      className:
        "text-white bg-blue-600 shadow-2xl border-2 border-white/30 font-bold",
    },
    planned: {
      icon: AlertCircle,
      text: "Planned",
      className:
        "text-black bg-yellow-400 shadow-2xl border-2 border-white/30 font-bold",
    },
    archived: {
      icon: Archive,
      text: "Archived",
      className:
        "text-white bg-gray-600 shadow-2xl border-2 border-white/30 font-bold",
    },
  };

  const config = statusConfig[status];
  const IconComponent = config.icon;

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${config.className}`}
    >
      <IconComponent size={12} className="mr-1" />
      {config.text}
    </div>
  );
};

// Fallback placeholder component
const ImagePlaceholder: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
      <div className="text-center">
        <FileImage
          size={48}
          className="text-muted-foreground/50 mx-auto mb-2"
        />
        <p className="text-sm text-muted-foreground/70 font-medium px-4">
          {title}
        </p>
      </div>
    </div>
  );
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  delay = 0,
}) => {
  const { isHydrated, isLoading } = useLoading();
  const [isClient, setIsClient] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const isReady = isHydrated && !isLoading;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleImageError = useCallback(() => {
    if (isClient) {
      setImageError(true);
      setImageLoading(false);
    }
  }, [isClient]);

  const handleImageLoad = useCallback(() => {
    if (isClient) {
      setImageLoading(false);
    }
  }, [isClient]);

  // Check if thumbnail is a video file
  const isVideo =
    project.thumbnail &&
    (project.thumbnail.endsWith(".mp4") ||
      project.thumbnail.endsWith(".webm") ||
      project.thumbnail.endsWith(".mov"));

  const demoLink = project.links.find((link) => link.type === "demo");
  const githubLink = project.links.find((link) => link.type === "github");

  const cardMotionProps =
    isClient && isReady
      ? {
          initial: { opacity: 0, y: 20, scale: 0.95 },
          animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.4,
              delay: delay + index * 0.1,
              ease: [0.4, 0, 0.2, 1],
            },
          },
          whileHover: { y: -5, scale: 1.02, transition: { duration: 0.2 } },
        }
      : isClient && !isReady
      ? {
          initial: { opacity: 0, y: 20, scale: 0.95 },
          animate: { opacity: 0, y: 20, scale: 0.95 },
        }
      : {};

  if (!isClient) {
    return (
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-md h-full flex flex-col">
        <div className="aspect-video bg-muted animate-pulse" />
        <div className="p-6 flex flex-col flex-grow space-y-4">
          <div className="h-6 bg-muted rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-muted rounded w-full animate-pulse" />
          <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
          <div className="flex flex-wrap gap-1 mt-auto pt-4 border-t border-border">
            {[...Array(3)].map((_, i) => (
              <div
                key={`skeleton-tech-${i}`}
                className="h-5 w-16 bg-muted rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      {...cardMotionProps}
      className="group relative bg-card border border-border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
    >
      <Link href={`/projects/${project.id}`} className="block">
        <div className="relative min-h-[200px] max-h-[300px] flex items-center justify-center overflow-hidden bg-muted rounded-t-xl cursor-pointer">
          <div className="w-full h-full flex items-center justify-center">
            {imageError || !project.thumbnail ? (
              <ImagePlaceholder title={project.title} />
            ) : isVideo ? (
              <>
                {imageLoading && (
                  <div className="absolute inset-0 bg-muted animate-pulse" />
                )}
                <video
                  src={project.thumbnail}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={`w-full h-auto object-contain max-h-[300px] transition-opacity duration-300 ${
                    imageLoading ? "opacity-0" : "opacity-100"
                  }`}
                  onError={handleImageError}
                  onLoadedData={handleImageLoad}
                  style={{
                    filter: "contrast(1.1) saturate(1.05) brightness(0.95)",
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              </>
            ) : (
              <>
                {imageLoading && (
                  <div className="absolute inset-0 bg-muted animate-pulse" />
                )}
                <Image
                  src={project.thumbnail}
                  alt={`${project.title} thumbnail`}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={`w-full h-auto object-contain max-h-[300px] transition-opacity duration-300 ${
                    imageLoading ? "opacity-0" : "opacity-100"
                  }`}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  priority={index < 2} // Prioritize first few images
                  style={{
                    filter: "contrast(1.1) saturate(1.05) brightness(0.95)",
                  }}
                />
              </>
            )}
          </div>

          {project.featured && (
            <div className="absolute top-3 left-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-2xl border-2 border-white/50 z-10">
              ⭐ Featured
            </div>
          )}
          <div className="absolute top-3 right-3 z-10">
            <StatusIndicator status={project.status} />
          </div>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <div className="flex items-start justify-between gap-3 mb-2">
            <Link href={`/projects/${project.id}`} className="flex-grow">
              <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors cursor-pointer line-clamp-2">
                {project.title}
              </h3>
            </Link>
            <div className="flex items-center gap-2 flex-shrink-0">
              {demoLink && (
                <motion.a
                  href={demoLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white w-8 h-8 rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center"
                  whileHover={isReady ? { scale: 1.05 } : {}}
                  whileTap={isReady ? { scale: 0.95 } : {}}
                  aria-label={`View live demo of ${project.title}`}
                  title="View Live Demo"
                >
                  <ExternalLink size={16} />
                </motion.a>
              )}
              {githubLink && (
                <motion.a
                  href={githubLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white w-8 h-8 rounded-lg hover:bg-gray-900 transition-colors shadow-sm flex items-center justify-center"
                  whileHover={isReady ? { scale: 1.05 } : {}}
                  whileTap={isReady ? { scale: 0.95 } : {}}
                  aria-label={`View source code of ${project.title}`}
                  title="View Source Code"
                >
                  <Github size={16} />
                </motion.a>
              )}
            </div>
          </div>
          <Link href={`/projects/${project.id}`}>
            <p className="text-muted-foreground mt-2 line-clamp-3 text-sm leading-relaxed flex-grow cursor-pointer">
              {project.shortDescription}
            </p>
          </Link>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 6).map((tech, techIndex) => (
              <span
                key={`tech-${project.id}-${tech.name}-${techIndex}`}
                className={`px-2 py-1 text-xs font-medium rounded-md ${getCategoryColor(
                  tech.category
                )}`}
              >
                {tech.name}
              </span>
            ))}
            {project.technologies.length > 6 && (
              <span className="px-2 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground">
                +{project.technologies.length - 6} more
              </span>
            )}
          </div>
        </div>

        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-4 grid grid-cols-2 gap-2">
            {project.metrics.slice(0, 2).map((metric, metricIndex) => (
              <div
                key={`metric-${project.id}-${metric.label}-${metricIndex}`}
                className="text-center p-2 bg-muted/50 rounded-md"
              >
                <div className="text-sm font-bold text-card-foreground">
                  {metric.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <Link href={`/projects/${project.id}`} className="mt-auto">
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{new Date(project.startDate).getFullYear()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={12} />
                <span>{project.teamSize}</span>
              </div>
            </div>
            <div className="text-primary font-medium">{project.role}</div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
