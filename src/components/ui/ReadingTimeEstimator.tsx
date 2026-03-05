"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import React from "react";

interface ReadingTimeEstimatorProps {
  content: string;
  className?: string;
}

export const ReadingTimeEstimator: React.FC<ReadingTimeEstimatorProps> = ({
  content,
  className = "",
}) => {
  // Calculate reading time (average 200 words per minute)
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center space-x-2 text-sm text-muted ${className}`}
    >
      <Clock size={14} />
      <span>{readingTime} min read</span>
      <span>•</span>
      <span>{wordCount.toLocaleString()} words</span>
    </motion.div>
  );
};

interface SectionNavigationProps {
  sections: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  className?: string;
}

export const SectionNavigation: React.FC<SectionNavigationProps> = ({
  sections,
  activeSection,
  onSectionClick,
  className = "",
}) => {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`space-y-2 ${className}`}
      role="navigation"
      aria-label="Page sections"
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionClick(section.id)}
          className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
            activeSection === section.id
              ? "bg-primary/10 text-primary border-l-4 border-primary"
              : "text-muted hover:text-foreground hover:bg-muted/10"
          }`}
          aria-current={activeSection === section.id ? "true" : undefined}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-2 h-2 rounded-full transition-colors ${
                section.completed
                  ? "bg-primary"
                  : activeSection === section.id
                  ? "bg-primary/60"
                  : "bg-muted"
              }`}
            />
            <span className="text-sm font-medium">{section.title}</span>
          </div>
        </button>
      ))}
    </motion.nav>
  );
};

interface ProgressIndicatorProps {
  progress: number;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  progress,
  className = "",
}) => {
  return (
    <motion.div
      className={`fixed top-0 left-0 w-full h-1 bg-muted/20 z-50 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-primary to-accent"
        style={{ width: `${progress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  );
};
