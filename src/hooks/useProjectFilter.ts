import { useState, useMemo } from "react";

import {
  projects as defaultProjects,
  sortProjects,
  SortConfig,
  SortOption,
  SortDirection,
} from "../../config/projects";

export interface ProjectFilterState {
  selectedCategory: string;
  selectedStatus: string;
  selectedTech: string;
  searchQuery: string;
  sortConfig: SortConfig;
}

interface UseProjectFilterReturn {
  filters: ProjectFilterState;
  setSelectedCategory: (category: string) => void;
  setSelectedStatus: (status: string) => void;
  setSelectedTech: (tech: string) => void;
  setSearchQuery: (query: string) => void;
  setSortConfig: (config: SortConfig) => void;
  clearFilters: () => void;
  filteredProjects: typeof defaultProjects;
  hasActiveFilters: boolean;
}

export const useProjectFilter = (
  initialProjects: typeof defaultProjects = defaultProjects
): UseProjectFilterReturn => {
  const [filters, setFilters] = useState<ProjectFilterState>({
    selectedCategory: "all",
    selectedStatus: "all",
    selectedTech: "all",
    searchQuery: "",
    sortConfig: { option: "newest", direction: "desc" },
  });

  const setSelectedCategory = (category: string) =>
    setFilters((prev) => ({ ...prev, selectedCategory: category }));
  const setSelectedStatus = (status: string) =>
    setFilters((prev) => ({ ...prev, selectedStatus: status }));
  const setSelectedTech = (tech: string) =>
    setFilters((prev) => ({ ...prev, selectedTech: tech }));
  const setSearchQuery = (query: string) =>
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  const setSortConfig = (config: SortConfig) =>
    setFilters((prev) => ({ ...prev, sortConfig: config }));

  const clearFilters = () =>
    setFilters({
      selectedCategory: "all",
      selectedStatus: "all",
      selectedTech: "all",
      searchQuery: "",
      sortConfig: { option: "newest", direction: "desc" },
    });

  const filteredProjects = useMemo(() => {
    const {
      selectedCategory,
      selectedStatus,
      selectedTech,
      searchQuery,
      sortConfig,
    } = filters;
    let data = [...initialProjects];

    // Apply filters
    if (selectedCategory !== "all") {
      data = data.filter((p) => p.category === selectedCategory);
    }
    if (selectedStatus !== "all") {
      data = data.filter((p) => p.status === selectedStatus);
    }
    if (selectedTech !== "all") {
      data = data.filter((p) =>
        p.technologies.some((t) => t.name === selectedTech)
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.fullDescription.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.name.toLowerCase().includes(q)) ||
          p.role.toLowerCase().includes(q)
      );
    }

    // Apply sorting using shared utility
    return sortProjects(data, sortConfig);
  }, [filters, initialProjects]);

  const hasActiveFilters = useMemo(() => {
    const { selectedCategory, selectedStatus, selectedTech, searchQuery } =
      filters;
    return (
      selectedCategory !== "all" ||
      selectedStatus !== "all" ||
      selectedTech !== "all" ||
      searchQuery.trim() !== ""
    );
  }, [filters]);

  return {
    filters,
    setSelectedCategory,
    setSelectedStatus,
    setSelectedTech,
    setSearchQuery,
    setSortConfig,
    clearFilters,
    filteredProjects,
    hasActiveFilters,
  };
};

// Re-export types for convenience
export type { SortOption, SortDirection, SortConfig };
