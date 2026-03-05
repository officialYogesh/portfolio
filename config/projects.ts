// Projects Configuration
// This file contains all project information with TypeScript interfaces

export interface ProjectLink {
  type: "demo" | "github" | "case-study" | "documentation";
  url: string;
  label: string;
}

export interface ProjectTechnology {
  name: string;
  category:
    | "frontend"
    | "backend"
    | "database"
    | "tools"
    | "cloud"
    | "testing"
    | "mobile";
  proficiency?: number; // Optional: 1-10 scale for project-specific proficiency
}

export interface ProjectFeature {
  title: string;
  description: string;
  icon?: string; // Optional icon name
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  status: "completed" | "in-progress" | "planned" | "archived";
  category:
    | "web-app"
    | "mobile-app"
    | "open-source"
    | "api"
    | "tool"
    | "landing-page";
  featured: boolean;
  thumbnail?: string; // Optional path to thumbnail image
  screenshots: string[]; // Array of screenshot paths
  technologies: ProjectTechnology[];
  features: ProjectFeature[];
  challenges: string[];
  solutions: string[];
  links: ProjectLink[];
  startDate: string; // ISO date string
  endDate?: string; // ISO date string, optional for ongoing projects
  teamSize: number;
  role: string; // Role in the project
  metrics?: {
    label: string;
    value: string;
  }[]; // Optional project metrics/achievements
}

export interface ProjectCategory {
  name: string;
  displayName: string;
  description: string;
  color: string;
  icon: string;
}

export const projectCategories: Record<string, ProjectCategory> = {
  "web-app": {
    name: "web-app",
    displayName: "Web Applications",
    description: "Full-stack web applications and platforms",
    color: "#3b82f6",
    icon: "globe",
  },
  "mobile-app": {
    name: "mobile-app",
    displayName: "Mobile Applications",
    description: "Native and cross-platform mobile apps",
    color: "#8b5cf6",
    icon: "smartphone",
  },
  "open-source": {
    name: "open-source",
    displayName: "Open Source",
    description: "Open source contributions and libraries",
    color: "#10b981",
    icon: "heart",
  },
  api: {
    name: "api",
    displayName: "APIs & Backend",
    description: "Backend services and API development",
    color: "#f59e0b",
    icon: "server",
  },
  tool: {
    name: "tool",
    displayName: "Developer Tools",
    description: "Development tools and utilities",
    color: "#ef4444",
    icon: "wrench",
  },
  "landing-page": {
    name: "landing-page",
    displayName: "Landing Pages",
    description: "Marketing and promotional websites",
    color: "#06b6d4",
    icon: "layout",
  },
};

export const projects: Project[] = [
  {
    id: "upside-down-game",
    title: "Upside Down",
    shortDescription:
      "Award-winning endless runner game inspired by Stranger Things with dual-world gameplay mechanics",
    fullDescription:
      "An innovative endless runner game inspired by Netflix's Stranger Things where players can swipe to switch between two parallel worlds - the normal world and the Upside Down. Players collect coins while dodging unique enemies in each dimension, creating an engaging dual-reality gaming experience that captivated over 1,000 players.",
    status: "completed",
    category: "mobile-app",
    featured: false,
    thumbnail: "/images/projects/upside-down/thumbnail.png",
    screenshots: [],
    technologies: [
      { name: "Unity", category: "tools", proficiency: 8 },
      { name: "C#", category: "backend", proficiency: 7 },
      { name: "Android", category: "mobile", proficiency: 9 },
      { name: "iOS", category: "mobile", proficiency: 7 },
      { name: "Game Design", category: "frontend", proficiency: 8 },
    ],
    features: [
      {
        title: "Dual World Mechanics",
        description:
          "Innovative swipe-to-switch gameplay between normal world and Upside Down dimensions",
        icon: "layers",
      },
      {
        title: "Endless Runner Gameplay",
        description:
          "Fast-paced infinite runner with progressively challenging obstacles and enemies",
        icon: "zap",
      },
      {
        title: "Stranger Things Theme",
        description:
          "Authentic visual design and atmosphere inspired by the popular Netflix series",
        icon: "film",
      },
      {
        title: "Cross-Platform Release",
        description:
          "Deployed on both Google Play Store and Apple App Store with optimized performance",
        icon: "smartphone",
      },
    ],
    challenges: [
      "Creating smooth world-switching animations without performance drops",
      "Balancing difficulty progression across two different game dimensions",
      "Optimizing graphics and physics for mobile devices with varying specs",
      "Implementing engaging gameplay mechanics that felt intuitive to players",
    ],
    solutions: [
      "Developed efficient rendering system that pre-loads both worlds for seamless transitions",
      "Created adaptive difficulty algorithm that adjusts based on player performance and world switching frequency",
      "Implemented LOD (Level of Detail) system and optimized assets for different device capabilities",
      "Conducted extensive user testing to refine swipe gestures and game feedback systems",
    ],
    links: [
      {
        type: "case-study",
        url: "https://teknack.in/hall-of-fame/",
        label: "Teknack Hall of Fame",
      },
      {
        type: "documentation",
        url: "https://teknack.in/about/",
        label: "ACM DBIT Gaming Studio",
      },
    ],
    startDate: "2018-10-01",
    endDate: "2019-03-01",
    teamSize: 2,
    role: "Co-Developer & Game Designer",
    metrics: [
      { label: "Downloads", value: "1,000+" },
      { label: "Award", value: "1st Place" },
      { label: "Platforms", value: "2" },
      { label: "Development Time", value: "5 months" },
    ],
  },
  {
    id: "jobfit-ai",
    title: "JobFitAI",
    shortDescription:
      "Demonstrating AI-powered resume analysis. Experience instant, evidence-grounded feedback on resume-job fit with actionable insights, keyword gap analysis, and rewrite suggestions.",
    fullDescription:
      "JobFitAI is a hobby project demonstrating a privacy-first web tool designed to help job seekers optimize their resumes. Built with cutting-edge AI technology, it showcases instant, evidence-grounded feedback powered by Retrieval-Augmented Generation (RAG). This project demonstrates the use of advanced language models to analyze compatibility between resumes and job descriptions, showcasing modern web development skills and AI integration capabilities.",
    status: "in-progress",
    category: "web-app",
    featured: true,
    thumbnail: "/images/projects/jobfit-ai/thumbnail.png",
    screenshots: [],
    technologies: [
      { name: "Next.js", category: "frontend", proficiency: 8 },
      { name: "Tailwind CSS", category: "frontend", proficiency: 8 },
      { name: "TypeScript", category: "frontend", proficiency: 8 },
      { name: "Vercel", category: "cloud", proficiency: 8 },
      { name: "Node.js", category: "backend", proficiency: 9 },
      { name: "Firebase", category: "cloud", proficiency: 8 },
      { name: "Supabase", category: "cloud", proficiency: 8 },
      { name: "PostgreSQL", category: "database", proficiency: 8 },
      { name: "LangChain", category: "backend", proficiency: 8 },
      { name: "Gemini 2.0 Flash", category: "backend", proficiency: 9 },
      { name: "OpenAI", category: "backend", proficiency: 9 },
      { name: "Claude", category: "backend", proficiency: 9 },
    ],
    features: [
      {
        title: "AI-Powered Resume Analysis",
        description:
          "Uses Gemini 2.0 Flash (Default) | BYOK (Bring Your Own Key) model to extract key skills, experiences, education, and achievements from resume text with high accuracy",
        icon: "target",
      },
      {
        title: "Career Path Recommendations",
        description:
          "Suggests career progression paths based on skills and market demand",
        icon: "file-text",
      },
      {
        title: "Job Description Matching",
        description:
          "Compares resumes against job descriptions and provides match percentage with detailed skill gap analysis",
        icon: "bar-chart",
      },
      {
        title: "Interactive Web Interface",
        description:
          "Built with Next.js and Tailwind CSS for seamless user experience with real-time analysis and JSON-formatted results",
        icon: "smartphone",
      },
    ],
    challenges: [
      "Ensuring accurate job-candidate matching with complex skill requirements",
      "Balancing AI model accuracy with response time for real-time analysis",
      "Creating interpretable AI recommendations that users can understand and act upon",
      "Maintaining data privacy while providing personalized recommendations",
      "Integrating multiple AI services (DeepInfra, Whisper) into a cohesive pipeline",
    ],
    solutions: [
      "Implemented semantic search using vector embeddings and cosine similarity for nuanced matching",
      "Built efficient data pipeline with Redis caching and background job processing",
      "Developed explainable AI features that show reasoning behind recommendations",
      "Implemented privacy-first architecture with data anonymization and user consent management",
    ],
    links: [
      {
        type: "demo",
        url: "https://jobfitai.iamyogesh.com/",
        label: "Live Demo",
      },
      {
        type: "github",
        url: "https://github.com/officialYogesh/JobFitAI",
        label: "Source Code",
      },
    ],
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    teamSize: 1,
    role: "Full-Stack Developer & AI Engineer",
    metrics: [
      { label: "Analysis Accuracy", value: "90%+" },
      { label: "Analysis Speed", value: "<8s" },
      { label: "Supported Formats", value: "PDF + Audio" },
      { label: "AI Model", value: "Gemini 2.0 Flash" },
    ],
  },
  {
    id: "covid19-india-tracker",
    title: "Covid-19 India tracker",
    shortDescription:
      "A comprehensive React-based dashboard to track current and historical COVID-19 data for India and its states and union territories with interactive visualizations.",
    fullDescription:
      "Covid-19 India tracker is a comprehensive web application that provides real-time and historical COVID-19 statistics for India. Built with React and featuring an interactive map, the application allows users to hover over any state or union territory to view detailed statistics. The platform includes dark mode support, sortable data tables, and rich data visualizations using Chart.js. With customizable time spans and state-wise data filtering, it became an essential tool for tracking the pandemic's progress across India.",
    status: "completed",
    category: "web-app",
    featured: true,
    thumbnail: "/images/projects/covid19-india-tracker/c4.mp4",
    screenshots: [
      "/images/projects/covid19-india-tracker/c4.mp4",
      "/images/projects/covid19-india-tracker/public_project_covid-19_c4.webm",
    ],
    technologies: [
      { name: "React", category: "frontend", proficiency: 8 },
      { name: "JavaScript", category: "frontend", proficiency: 8 },
      { name: "Material-UI", category: "frontend", proficiency: 8 },
      { name: "Chart.js", category: "frontend", proficiency: 7 },
      { name: "D3.js", category: "frontend", proficiency: 6 },
      { name: "React Simple Maps", category: "frontend", proficiency: 7 },
      { name: "Axios", category: "backend", proficiency: 8 },
      { name: "Node.js", category: "backend", proficiency: 8 },
      { name: "Vercel", category: "cloud", proficiency: 8 },
    ],
    features: [
      {
        title: "Interactive Map Visualization",
        description:
          "Hover over any state or union territory to view real-time COVID-19 statistics with visual representation across Indian states",
        icon: "map",
      },
      {
        title: "Dark Mode Support",
        description:
          "Toggle between light and dark themes for better user experience and reduced eye strain",
        icon: "moon",
      },
      {
        title: "Historical Data Visualization",
        description:
          "Interactive charts displaying daily or cumulative data with customizable time spans (1 month, 3 months, or all data)",
        icon: "bar-chart",
      },
      {
        title: "Sortable Data Table",
        description:
          "Comprehensive table view with sortable columns for easy comparison between different states and union territories",
        icon: "table",
      },
    ],
    challenges: [
      "Handling large datasets efficiently while maintaining smooth user interactions",
      "Creating responsive visualizations that work across different screen sizes and devices",
      "Implementing real-time data updates without overwhelming the COVID-19 India API",
      "Designing intuitive map interactions for both desktop and mobile users",
      "Optimizing chart rendering performance for historical data visualization",
    ],
    solutions: [
      "Implemented data caching and pagination strategies to manage large datasets efficiently",
      "Used responsive design principles with Material-UI components and CSS Grid for optimal mobile experience",
      "Built intelligent API polling system with rate limiting and error handling for reliable data updates",
      "Created touch-friendly map interactions with hover states and click handlers for mobile devices",
      "Optimized Chart.js configuration with lazy loading and data sampling for smooth chart animations",
    ],
    links: [
      {
        type: "demo",
        url: "https://covid19tracker.iamyogesh.com/",
        label: "Live Demo",
      },
      {
        type: "github",
        url: "https://github.com/officialYogesh/India-covid19-tracker",
        label: "Source Code",
      },
    ],
    startDate: "2020-04-01",
    endDate: "2020-06-15",
    teamSize: 1,
    role: "Full-Stack Developer",
    metrics: [
      { label: "Data Sources", value: "COVID19 India API" },
      { label: "States Covered", value: "28 + 8 UTs" },
      { label: "Chart Types", value: "Multiple" },
      { label: "Theme Support", value: "Light/Dark" },
    ],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter((project) => project.category === category);
}

export function getFeaturedProjects(): Project[] {
  const featuredProjects = projects.filter((project) => project.featured);
  return sortProjects(featuredProjects, {
    option: "newest",
    direction: "desc",
  });
}

export function getProjectsByStatus(status: Project["status"]): Project[] {
  return projects.filter((project) => project.status === status);
}

export function getAllCategories(): string[] {
  return Object.keys(projectCategories);
}

export function getProjectTechnologies(): string[] {
  const allTechnologies = new Set<string>();
  projects.forEach((project) => {
    project.technologies.forEach((tech) => {
      allTechnologies.add(tech.name);
    });
  });
  return Array.from(allTechnologies).sort();
}

// Shared sorting utility for consistent sorting across pages
export type SortOption = "featured" | "newest" | "oldest" | "title" | "status";
export type SortDirection = "asc" | "desc";

export interface SortConfig {
  option: SortOption;
  direction: SortDirection;
}

export function sortProjects(
  projects: Project[],
  sortConfig: SortConfig
): Project[] {
  return [...projects].sort((a, b) => {
    const { option, direction } = sortConfig;

    switch (option) {
      case "featured":
        const featuredComparison = (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        return direction === "desc" ? featuredComparison : -featuredComparison;

      case "newest":
        const newestComparison =
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        return direction === "desc" ? newestComparison : -newestComparison;

      case "oldest":
        const oldestComparison =
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        return direction === "asc" ? oldestComparison : -oldestComparison;

      case "title":
        const titleComparison = a.title.localeCompare(b.title);
        return direction === "asc" ? titleComparison : -titleComparison;

      case "status":
        const statusOrder = {
          "in-progress": 0,
          completed: 1,
          planned: 2,
          archived: 3,
        };
        const statusComparison = statusOrder[a.status] - statusOrder[b.status];
        return direction === "asc" ? statusComparison : -statusComparison;

      default:
        return 0;
    }
  });
}

export default projects;
