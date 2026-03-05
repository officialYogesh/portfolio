"use client";

import { motion } from "framer-motion";
import { Search, X, ChevronDown } from "lucide-react";
import React, { useState, useCallback } from "react";

import { AnimatedContainer } from "@/components/animations/AnimatedContainer";
import { Container } from "@/components/layout/Container";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { useLoading } from "@/contexts/LoadingContext";
import { useProjectFilter } from "@/hooks/useProjectFilter";

import { projects } from "../../../config/projects";

const ProjectsPage: React.FC = () => {
  const {
    filters: {
      selectedCategory,
      selectedStatus,
      selectedTech,
      searchQuery,
      sortConfig,
    },
    setSelectedCategory,
    setSelectedStatus,
    setSelectedTech,
    setSearchQuery,
    setSortConfig,
    clearFilters,
    filteredProjects,
    hasActiveFilters,
  } = useProjectFilter(projects);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { isHydrated, isLoading: appIsLoading } = useLoading();
  const isReady = isHydrated && !appIsLoading;

  const projectStats = {
    total: projects.length,
    completed: projects.filter((p) => p.status === "completed").length,
    inProgress: projects.filter((p) => p.status === "in-progress").length,
    featured: projects.filter((p) => p.featured).length,
  };

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      const [option, dir] = value.includes("-")
        ? (value.split("-") as [
            typeof sortConfig.option,
            typeof sortConfig.direction
          ])
        : [value as typeof sortConfig.option, undefined];
      setSortConfig({
        option,
        direction:
          dir ??
          (option === "newest" || option === "featured" || option === "status"
            ? "desc"
            : "asc"),
      });
    },
    [setSortConfig, sortConfig]
  );

  const handleClearFilters = clearFilters;

  const toggleFilter = useCallback(() => {
    setIsFilterOpen((prev) => !prev);
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
    [setSearchQuery]
  );

  if (!isReady) return null;

  return (
    <div className="min-h-screen py-16 lg:py-20">
      <Container size="xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            My Projects
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A collection of software projects showcasing my expertise in modern
            web technologies, mobile development, and AI solutions. Each project
            represents a unique challenge and learning experience.
          </p>

          {/* Project Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {projectStats.total}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Projects
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {projectStats.completed}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {projectStats.inProgress}
              </div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-accent">
                {projectStats.featured}
              </div>
              <div className="text-sm text-muted-foreground">Featured</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Search and Sort Controls */}
        <AnimatedContainer delay={0.2} className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <input
                type="text"
                placeholder="Search projects by name, technology, or description..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                aria-label="Search projects"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="sort-select"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Sort by:
                </label>
                <div className="relative">
                  <select
                    id="sort-select"
                    value={`${sortConfig.option}${
                      sortConfig.direction ? "-" + sortConfig.direction : ""
                    }`}
                    onChange={handleSortChange}
                    className="bg-card border border-border rounded-md px-3 py-2 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer hover:bg-card/80 transition-colors appearance-none min-w-[140px]"
                    style={{
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                    }}
                  >
                    <option value="featured-desc" className="cursor-pointer">
                      Featured First
                    </option>
                    <option value="newest-desc" className="cursor-pointer">
                      Newest First
                    </option>
                    <option value="oldest-asc" className="cursor-pointer">
                      Oldest First
                    </option>
                    <option value="title-asc" className="cursor-pointer">
                      Title A-Z
                    </option>
                    <option value="title-desc" className="cursor-pointer">
                      Title Z-A
                    </option>
                    <option value="status-desc" className="cursor-pointer">
                      Status
                    </option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </AnimatedContainer>

        {/* Filter Component */}
        <AnimatedContainer delay={0.5} className="mb-8">
          <ProjectFilter
            selectedCategory={selectedCategory}
            selectedStatus={selectedStatus}
            selectedTech={selectedTech}
            projects={projects}
            onCategoryChange={setSelectedCategory}
            onStatusChange={setSelectedStatus}
            onTechChange={setSelectedTech}
            onClearFilters={handleClearFilters}
            isFilterOpen={isFilterOpen}
            onToggleFilter={toggleFilter}
          />
        </AnimatedContainer>

        {/* Results Summary */}
        {!appIsLoading && (
          <AnimatedContainer delay={0.6} className="mb-6">
            <div className="text-sm text-muted-foreground">
              {hasActiveFilters ? (
                <>
                  Found{" "}
                  <span className="font-medium text-foreground">
                    {filteredProjects.length}
                  </span>{" "}
                  project
                  {filteredProjects.length !== 1 ? "s" : ""} matching your
                  criteria
                </>
              ) : (
                <>
                  Showing all{" "}
                  <span className="font-medium text-foreground">
                    {filteredProjects.length}
                  </span>{" "}
                  projects
                </>
              )}
            </div>
          </AnimatedContainer>
        )}

        {/* Project Grid */}
        <ProjectGrid
          projects={filteredProjects}
          loading={appIsLoading}
          className="mb-12"
        />

        {/* Additional Information with Enhanced CTAs */}
        {!appIsLoading && filteredProjects.length > 0 && (
          <AnimatedContainer className="text-center mt-12 mb-8">
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 max-w-3xl mx-auto">
              <h3 className="text-xl md:text-2xl font-semibold text-card-foreground mb-3 md:mb-4">
                More Projects Coming Soon
              </h3>
              <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
                I&apos;m constantly working on new projects and exploring
                innovative technologies. Currently developing exciting
                AI-powered solutions and modern web applications.
              </p>
            </div>
          </AnimatedContainer>
        )}

        {/* Enhanced Empty State for No Results */}
        {!appIsLoading && filteredProjects.length === 0 && (
          <AnimatedContainer delay={0.6} className="text-center py-12 md:py-16">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-5 md:mb-6">
                <Search className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-card-foreground mb-3 md:mb-4">
                No Projects Found
              </h3>
              <p className="text-muted-foreground text-sm md:text-base mb-5 md:mb-6">
                No projects match your current search and filter criteria. Try
                adjusting your filters or search terms.
              </p>
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm shadow-md hover:shadow-lg"
              >
                Clear All Filters
              </button>
            </div>
          </AnimatedContainer>
        )}
      </Container>
    </div>
  );
};

export default ProjectsPage;
