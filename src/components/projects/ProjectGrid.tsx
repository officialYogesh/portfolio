"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useMemo, memo, useState, useEffect } from "react";

import { Project } from "../../../config/projects";

import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
  loading?: boolean;
  className?: string;
}

// Loading skeleton component - memoized for performance
const ProjectCardSkeleton: React.FC<{ index: number }> = memo(({ index }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return (
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-md h-96 animate-pulse" />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-md"
    >
      {/* Image skeleton */}
      <div className="aspect-video bg-muted animate-pulse" />

      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
          <div className="h-4 bg-muted animate-pulse rounded w-full" />
          <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
        </div>

        {/* Technology badges skeleton */}
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: 4 }).map((_, techIndex) => (
            <div
              key={`skeleton-tech-${techIndex}`}
              className="h-6 bg-muted animate-pulse rounded w-16"
            />
          ))}
        </div>

        {/* Metrics skeleton */}
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 2 }).map((_, metricIndex) => (
            <div
              key={`skeleton-metric-${metricIndex}`}
              className="p-2 bg-muted/50 rounded-md"
            >
              <div className="h-4 bg-muted animate-pulse rounded w-12 mx-auto mb-1" />
              <div className="h-3 bg-muted animate-pulse rounded w-16 mx-auto" />
            </div>
          ))}
        </div>

        {/* Footer skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="h-3 bg-muted animate-pulse rounded w-12" />
            <div className="h-3 bg-muted animate-pulse rounded w-8" />
          </div>
          <div className="h-3 bg-muted animate-pulse rounded w-20" />
        </div>
      </div>
    </motion.div>
  );
});

// Set display name for better debugging
ProjectCardSkeleton.displayName = "ProjectCardSkeleton";

// Memoized project item component to prevent unnecessary re-renders
const ProjectGridItem: React.FC<{
  project: Project;
  index: number;
  staggerDelay: number;
  maxStaggerItems: number;
}> = memo(({ project, index, staggerDelay, maxStaggerItems }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const delay = Math.min(index * staggerDelay, maxStaggerItems * staggerDelay);

  if (!isClient) {
    // Render a simple placeholder div for SSR to match structure
    return (
      <div className="w-full h-96 bg-card border border-border rounded-xl overflow-hidden shadow-md animate-pulse" />
    );
  }

  return (
    <motion.div
      key={project.id}
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.4,
          delay,
          ease: [0.4, 0, 0.2, 1],
        },
      }}
      exit={{
        opacity: 0,
        y: -20,
        scale: 0.9,
        transition: {
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        },
      }}
      className="w-full h-full"
    >
      <ProjectCard project={project} index={index} delay={delay} />
    </motion.div>
  );
});

// Set display name for better debugging
ProjectGridItem.displayName = "ProjectGridItem";

export const ProjectGrid: React.FC<ProjectGridProps> = memo(
  ({ projects, loading = false, className = "" }) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);

    // Memoize grid configuration for performance
    const gridConfig = useMemo(
      () => ({
        baseDelay: 0.1,
        staggerDelay: 0.08,
        maxStaggerItems: 12, // Limit stagger effect for performance
      }),
      []
    );

    // Memoize projects list to prevent unnecessary re-renders
    const projectsList = useMemo(() => projects, [projects]);

    const containerMotionProps = isClient
      ? {
          initial: { opacity: 0 },
          animate: {
            opacity: 1,
            transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
          },
        }
      : {};

    const gridMotionProps = isClient
      ? {
          initial: "hidden",
          animate: "visible",
          exit: "hidden",
          layout: true,
          variants: {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                duration: 0.4,
                staggerChildren: gridConfig.staggerDelay,
                delayChildren: gridConfig.baseDelay,
              },
            },
          },
        }
      : {};

    // Show loading state
    if (!isClient) {
      // Basic placeholder for SSR to match structure
      return (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
        >
          {Array.from({ length: loading ? 6 : projectsList.length || 1 }).map(
            (_, index) => (
              <div
                key={`ssr-placeholder-${index}`}
                className="bg-card border border-border rounded-xl overflow-hidden shadow-md h-96 animate-pulse"
              />
            )
          )}
        </div>
      );
    }

    if (loading) {
      return (
        <motion.div
          {...containerMotionProps}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={`skeleton-${index}`} index={index} />
          ))}
        </motion.div>
      );
    }

    // Show empty state - handled by parent component now
    if (!projectsList || projectsList.length === 0) {
      return (
        <motion.div {...containerMotionProps} className={className}>
          {/* Empty state is handled by parent component */}
        </motion.div>
      );
    }

    return (
      <motion.div {...containerMotionProps} className={className}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`grid-${projectsList.map((p) => p.id).join("-")}`}
            {...gridMotionProps}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projectsList.map((project, index) => (
              <ProjectGridItem
                key={project.id}
                project={project}
                index={index}
                staggerDelay={gridConfig.staggerDelay}
                maxStaggerItems={gridConfig.maxStaggerItems}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Results summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: isClient ? 0.6 : 0 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Showing {projectsList.length} project
            {projectsList.length !== 1 ? "s" : ""}
          </p>
        </motion.div>
      </motion.div>
    );
  }
);

// Set display name for better debugging
ProjectGrid.displayName = "ProjectGrid";

export default ProjectGrid;
