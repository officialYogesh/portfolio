"use client";

import { motion } from "framer-motion";
import {
  Filter,
  X,
  Globe,
  Smartphone,
  Heart,
  Server,
  Wrench,
  Layout,
  CheckCircle,
  Clock,
  AlertCircle,
  Archive,
} from "lucide-react";
import React, { useMemo } from "react";

import { Project, projectCategories } from "../../../config/projects";

interface FilterOption {
  key: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
}

interface ProjectFilterProps {
  selectedCategory: string;
  selectedStatus: string;
  selectedTech: string;
  projects: Project[];
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
  onTechChange: (tech: string) => void;
  onClearFilters: () => void;
  isFilterOpen: boolean;
  onToggleFilter: () => void;
}

// Icon mapping for categories
const categoryIcons = {
  "web-app": <Globe size={16} />,
  "mobile-app": <Smartphone size={16} />,
  "open-source": <Heart size={16} />,
  api: <Server size={16} />,
  tool: <Wrench size={16} />,
  "landing-page": <Layout size={16} />,
};

// Icon mapping for status
const statusIcons = {
  completed: <CheckCircle size={16} />,
  "in-progress": <Clock size={16} />,
  planned: <AlertCircle size={16} />,
  archived: <Archive size={16} />,
};

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  selectedCategory,
  selectedStatus,
  selectedTech,
  projects,
  onCategoryChange,
  onStatusChange,
  onTechChange,
  onClearFilters,
  isFilterOpen,
  onToggleFilter,
}) => {
  // Memoize unique technologies to prevent infinite re-calculations
  const allTechnologies = useMemo((): string[] => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      project.technologies.forEach((tech) => {
        techSet.add(tech.name);
      });
    });
    return Array.from(techSet).sort();
  }, [projects]);

  // Memoize project counts to prevent infinite re-calculations
  const projectCounts = useMemo(() => {
    const getProjectCountForCategory = (category: string): number => {
      return category === "all"
        ? projects.length
        : projects.filter((p) => p.category === category).length;
    };

    const getProjectCountForStatus = (status: string): number => {
      return status === "all"
        ? projects.length
        : projects.filter((p) => p.status === status).length;
    };

    const getProjectCountForTech = (tech: string): number => {
      return tech === "all"
        ? projects.length
        : projects.filter((p) => p.technologies.some((t) => t.name === tech))
            .length;
    };

    return {
      getProjectCountForCategory,
      getProjectCountForStatus,
      getProjectCountForTech,
    };
  }, [projects]);

  // Memoize filter options to prevent unnecessary re-renders
  const categoryOptions: FilterOption[] = useMemo(
    () => [
      {
        key: "all",
        label: "All Projects",
        icon: <Filter size={16} />,
        count: projectCounts.getProjectCountForCategory("all"),
      },
      ...Object.values(projectCategories).map((category) => ({
        key: category.name,
        label: category.displayName,
        icon: categoryIcons[category.name as keyof typeof categoryIcons] || (
          <Globe size={16} />
        ),
        count: projectCounts.getProjectCountForCategory(category.name),
      })),
    ],
    [projectCounts]
  );

  const statusOptions: FilterOption[] = useMemo(
    () => [
      {
        key: "all",
        label: "All Status",
        icon: <Filter size={16} />,
        count: projectCounts.getProjectCountForStatus("all"),
      },
      {
        key: "completed",
        label: "Completed",
        icon: statusIcons.completed,
        count: projectCounts.getProjectCountForStatus("completed"),
      },
      {
        key: "in-progress",
        label: "In Progress",
        icon: statusIcons["in-progress"],
        count: projectCounts.getProjectCountForStatus("in-progress"),
      },
      {
        key: "planned",
        label: "Planned",
        icon: statusIcons.planned,
        count: projectCounts.getProjectCountForStatus("planned"),
      },
      {
        key: "archived",
        label: "Archived",
        icon: statusIcons.archived,
        count: projectCounts.getProjectCountForStatus("archived"),
      },
    ],
    [projectCounts]
  );

  const techOptions: FilterOption[] = useMemo(
    () => [
      {
        key: "all",
        label: "All Technologies",
        icon: <Filter size={16} />,
        count: projectCounts.getProjectCountForTech("all"),
      },
      ...allTechnologies.slice(0, 15).map((tech) => ({
        key: tech,
        label: tech,
        icon: (
          <div className="w-4 h-4 bg-primary/20 rounded text-xs flex items-center justify-center font-mono">
            {tech.charAt(0)}
          </div>
        ),
        count: projectCounts.getProjectCountForTech(tech),
      })),
    ],
    [allTechnologies, projectCounts]
  );

  // Check if any filters are active
  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedStatus !== "all" ||
    selectedTech !== "all";

  // Single coordinated animation system
  const containerVariants = {
    collapsed: {
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        when: "afterChildren",
      },
    },
    expanded: {
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const filterPanelVariants = {
    collapsed: {
      height: 0,
      opacity: 0,
      paddingTop: 0,
      paddingBottom: 0,
      marginTop: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        opacity: { duration: 0.2, delay: 0 },
      },
    },
    expanded: {
      height: "auto",
      opacity: 1,
      paddingTop: 24,
      paddingBottom: 24,
      marginTop: 16,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        opacity: { duration: 0.25, delay: 0.1 },
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    collapsed: {
      opacity: 0,
      y: -8,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
    expanded: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    inactive: { scale: 1 },
    active: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.1, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      layout
      variants={containerVariants}
      initial="collapsed"
      animate={isFilterOpen ? "expanded" : "collapsed"}
      className="space-y-4"
      layoutId="filter-container"
    >
      {/* Filter Toggle and Clear Button */}
      <div className="flex items-center justify-between">
        <motion.button
          onClick={onToggleFilter}
          className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Filter size={16} />
          <span className="font-medium">Filters</span>
          {hasActiveFilters && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
        </motion.button>

        {hasActiveFilters && (
          <motion.button
            onClick={onClearFilters}
            className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-lg transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <X size={16} />
            <span className="font-medium">Clear Filters</span>
          </motion.button>
        )}
      </div>

      {/* Filter Panel with coordinated animation */}
      <motion.div
        variants={filterPanelVariants}
        className="bg-card border border-border rounded-xl overflow-hidden"
        style={{
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <div className="space-y-6">
          {/* Category Filter */}
          <motion.div variants={sectionVariants}>
            <h3 className="text-sm font-semibold text-card-foreground mb-3">
              Category
            </h3>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((option) => (
                <motion.button
                  key={option.key}
                  onClick={() => onCategoryChange(option.key)}
                  variants={buttonVariants}
                  initial="inactive"
                  animate="inactive"
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 min-h-[36px] ${
                    selectedCategory === option.key
                      ? "bg-primary text-primary-foreground scale-[1.02]"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {option.icon}
                  <span>{option.label}</span>
                  {option.count !== undefined && (
                    <span className="bg-background/20 text-xs px-1.5 py-0.5 rounded">
                      {option.count}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Status Filter */}
          <motion.div variants={sectionVariants}>
            <h3 className="text-sm font-semibold text-card-foreground mb-3">
              Status
            </h3>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <motion.button
                  key={option.key}
                  onClick={() => onStatusChange(option.key)}
                  variants={buttonVariants}
                  initial="inactive"
                  animate="inactive"
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 min-h-[36px] ${
                    selectedStatus === option.key
                      ? "bg-primary text-primary-foreground scale-[1.02]"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {option.icon}
                  <span>{option.label}</span>
                  {option.count !== undefined && (
                    <span className="bg-background/20 text-xs px-1.5 py-0.5 rounded">
                      {option.count}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Technology Filter */}
          <motion.div variants={sectionVariants}>
            <h3 className="text-sm font-semibold text-card-foreground mb-3">
              Popular Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {techOptions.map((option) => (
                <motion.button
                  key={option.key}
                  onClick={() => onTechChange(option.key)}
                  variants={buttonVariants}
                  initial="inactive"
                  animate="inactive"
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 min-h-[36px] ${
                    selectedTech === option.key
                      ? "bg-primary text-primary-foreground scale-[1.02]"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {option.icon}
                  <span>{option.label}</span>
                  {option.count !== undefined && (
                    <span className="bg-background/20 text-xs px-1.5 py-0.5 rounded">
                      {option.count}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
            {allTechnologies.length > 15 && (
              <p className="text-xs text-muted-foreground mt-2">
                Showing top 15 technologies. View individual projects for
                complete tech stacks.
              </p>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectFilter;
