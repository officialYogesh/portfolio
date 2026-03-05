// Configuration Index
// This file exports all configuration files and types for easy importing

// Content Configuration
export {
  contentConfig,
  getTagline,
  getCTA,
  getProfessionalMessage,
  getAvailabilityInfo,
  getResponseTimePromise,
  getErrorMessage,
  getSectionTitle,
  getProfessionalTitles,
} from "./content-config";
export type {
  ContentConfig,
  TaglineVariations,
  CallToActionConfig,
  MessagingConfig,
  AvailabilityConfig,
  ErrorMessagesConfig,
  SectionTitlesConfig,
} from "./content-config";

// Site Configuration
export {
  siteConfig,
  getNavigationItems,
  getFooterConfig,
  getFeatureFlags,
  isFeatureEnabled,
  getAnalyticsConfig,
  getContactConfig,
  generatePageTitle,
  generatePageDescription,
  generatePageUrl,
} from "./site-config";
export type {
  SiteConfig,
  NavigationItem,
  FooterConfig,
  FooterLinkGroup,
  FeatureFlags,
  AnalyticsConfig,
  ContactConfig,
} from "./site-config";

// Personal Information
export {
  personalInfo,
  getResumeUrl,
  getResumeDownloadName,
  getProfileImageAlt,
  getSocialLinkByPlatform,
} from "./personal-info";
export type {
  PersonalInfo,
  SocialLink,
  SEOInfo,
  ResumeFileInfo,
  ImageInfo,
  ContactInfo,
} from "./personal-info";

// Skills and Technologies
export {
  skills,
  skillCategories,
  getSkillsByCategory,
  getAllCategories,
} from "./skills";
export type { Skill, SkillCategory, SkillCategoryInfo } from "./skills";

// Theme System
export {
  themes,
  defaultTheme,
  themeList,
  getTheme,
  applyTheme,
  getStoredTheme,
  initializeTheme,
  themeDescriptions,
  getSystemPreference,
  getThemeForSystemPreference,
  initializeThemeWithSystemPreference,
  setupSystemPreferenceListener,
} from "./themes";
export type { ThemeColors, ThemeName } from "./themes";

// Projects
export {
  projects,
  projectCategories,
  getProjectById,
  getProjectsByCategory,
  getFeaturedProjects,
  getProjectsByStatus,
  getAllCategories as getAllProjectCategories,
  getProjectTechnologies,
} from "./projects";
export type {
  Project,
  ProjectLink,
  ProjectTechnology,
  ProjectFeature,
  ProjectCategory,
} from "./projects";

// Education and Certifications
export {
  education,
  certifications,
  achievements,
  onlineCourses,
  getEducationById,
  getCertificationById,
  getAchievementById,
  getCertificationsByCategory,
  getAchievementsByCategory,
  getActiveCertifications,
  getRecentAchievements,
  getAllSkillsFromEducation,
} from "./education";
export type {
  EducationDegree,
  Certification,
  Achievement,
  OnlineCourse,
} from "./education";

// Home Page Configuration
export {
  homeConfig,
  getRecruiterHooks,
  getProfessionalTitle,
  getHeroStats,
  getHeroDescription,
  getTechnologies,
  getTypingAnimationConfig,
  getAchievementSection,
  getProjectsSection,
  getContactSection,
} from "./home-config";
export type { HomePageConfig } from "./home-config";

// Validation System
export {
  validateAllConfigurations,
  validateConfigurationsForBuild,
} from "./validation";
export type { ValidationError, ValidationResult } from "./validation";

// Import for default export
import {
  education,
  certifications,
  achievements,
  onlineCourses,
} from "./education";
import { personalInfo } from "./personal-info";
import { projects, projectCategories } from "./projects";
import { skills, skillCategories } from "./skills";
import { themes } from "./themes";

// Re-export default configurations for backwards compatibility
export default {
  personalInfo,
  skills,
  skillCategories,
  themes,
  projects,
  projectCategories,
  education,
  certifications,
  achievements,
  onlineCourses,
};
