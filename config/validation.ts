// Build-time Validation for Configuration Files
// This file validates all configuration data at build time to ensure data integrity

import { education, certifications } from "./education";
import type { EducationDegree, Certification } from "./education";
import { personalInfo, type PersonalInfo } from "./personal-info";
import { projects, type Project } from "./projects";
import { skills, skillCategories, type Skill } from "./skills";
import { themes, type ThemeColors } from "./themes";

// Validation error types
export interface ValidationError {
  file: string;
  field: string;
  message: string;
  value?: unknown;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// URL validation regex
const URL_REGEX = /^https?:\/\/.+/;

// Date validation (ISO format)
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

// Validation utility functions
function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

function isValidUrl(url: string): boolean {
  return URL_REGEX.test(url);
}

function isValidISODate(date: string): boolean {
  return ISO_DATE_REGEX.test(date) && !isNaN(Date.parse(date));
}

function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

function validateRequired<T>(
  value: T,
  fieldName: string,
  fileName: string
): ValidationError | null {
  if (value === undefined || value === null || value === "") {
    return {
      file: fileName,
      field: fieldName,
      message: `Required field is missing or empty`,
      value,
    };
  }
  return null;
}

function validatePersonalInfo(): ValidationError[] {
  const errors: ValidationError[] = [];
  const fileName = "personal-info.ts";

  // Required field validations
  const requiredFields: (keyof PersonalInfo)[] = [
    "name",
    "title",
    "email",
    "location",
    "experience",
    "availability",
    "tagline",
    "bio",
  ];

  for (const field of requiredFields) {
    const error = validateRequired(personalInfo[field], field, fileName);
    if (error) errors.push(error);
  }

  // Email format validation
  if (personalInfo.email && !isValidEmail(personalInfo.email)) {
    errors.push({
      file: fileName,
      field: "email",
      message: "Invalid email format",
      value: personalInfo.email,
    });
  }

  // Social links validation
  if (personalInfo.socialLinks) {
    personalInfo.socialLinks.forEach((link, index) => {
      if (!link.platform) {
        errors.push({
          file: fileName,
          field: `socialLinks[${index}].platform`,
          message: "Platform is required",
          value: link.platform,
        });
      }
      if (!link.url) {
        errors.push({
          file: fileName,
          field: `socialLinks[${index}].url`,
          message: "URL is required",
          value: link.url,
        });
      } else if (!isValidUrl(link.url) && !link.url.startsWith("mailto:")) {
        errors.push({
          file: fileName,
          field: `socialLinks[${index}].url`,
          message: "Invalid URL format",
          value: link.url,
        });
      }
      if (!link.username) {
        errors.push({
          file: fileName,
          field: `socialLinks[${index}].username`,
          message: "Username is required",
          value: link.username,
        });
      }
    });
  }

  return errors;
}

function validateSkills(): ValidationError[] {
  const errors: ValidationError[] = [];
  const fileName = "skills.ts";

  // Validate skills array
  if (!Array.isArray(skills) || skills.length === 0) {
    errors.push({
      file: fileName,
      field: "skills",
      message: "Skills array must not be empty",
      value: skills.length,
    });
    return errors;
  }

  // Validate each skill
  skills.forEach((skill, index) => {
    const requiredFields: (keyof Skill)[] = [
      "name",
      "category",
      "proficiency",
      "experience",
    ];

    for (const field of requiredFields) {
      const error = validateRequired(
        skill[field],
        `skills[${index}].${field}`,
        fileName
      );
      if (error) errors.push(error);
    }

    // Validate proficiency range
    if (
      skill.proficiency !== undefined &&
      (skill.proficiency < 1 || skill.proficiency > 10)
    ) {
      errors.push({
        file: fileName,
        field: `skills[${index}].proficiency`,
        message: "Proficiency must be between 1 and 10",
        value: skill.proficiency,
      });
    }

    // Validate category exists
    if (skill.category && !skillCategories[skill.category]) {
      errors.push({
        file: fileName,
        field: `skills[${index}].category`,
        message: "Invalid skill category",
        value: skill.category,
      });
    }
  });

  return errors;
}

function validateThemes(): ValidationError[] {
  const errors: ValidationError[] = [];
  const fileName = "themes.ts";

  if (!themes || Object.keys(themes).length === 0) {
    errors.push({
      file: fileName,
      field: "themes",
      message: "Themes object must not be empty",
      value: Object.keys(themes).length,
    });
    return errors;
  }

  Object.entries(themes).forEach(([themeName, theme]) => {
    const requiredFields: (keyof ThemeColors)[] = [
      "name",
      "displayName",
      "background",
      "foreground",
      "primary",
      "secondary",
      "accent",
      "muted",
      "border",
      "card",
    ];

    for (const field of requiredFields) {
      const error = validateRequired(
        theme[field],
        `themes.${themeName}.${field}`,
        fileName
      );
      if (error) errors.push(error);
    }

    // Validate color format for color fields
    const colorFields: (keyof ThemeColors)[] = [
      "background",
      "foreground",
      "primary",
      "secondary",
      "accent",
      "muted",
      "border",
      "card",
      "destructive",
      "warning",
      "info",
    ];

    for (const field of colorFields) {
      const colorValue = theme[field];
      if (colorValue && !isValidHexColor(colorValue)) {
        errors.push({
          file: fileName,
          field: `themes.${themeName}.${field}`,
          message: "Invalid hex color format",
          value: colorValue,
        });
      }
    }
  });

  return errors;
}

function validateProjects(): ValidationError[] {
  const errors: ValidationError[] = [];
  const fileName = "projects.ts";

  if (!Array.isArray(projects) || projects.length === 0) {
    errors.push({
      file: fileName,
      field: "projects",
      message: "Projects array must not be empty",
      value: projects.length,
    });
    return errors;
  }

  projects.forEach((project, index) => {
    const requiredFields: (keyof Project)[] = [
      "id",
      "title",
      "shortDescription",
      "fullDescription",
      "status",
      "category",
      "featured",
      "technologies",
      "startDate",
      "teamSize",
      "role",
    ];

    for (const field of requiredFields) {
      const error = validateRequired(
        project[field],
        `projects[${index}].${field}`,
        fileName
      );
      if (error) errors.push(error);
    }

    // Validate dates
    if (project.startDate && !isValidISODate(project.startDate)) {
      errors.push({
        file: fileName,
        field: `projects[${index}].startDate`,
        message: "Invalid ISO date format (YYYY-MM-DD)",
        value: project.startDate,
      });
    }

    if (project.endDate && !isValidISODate(project.endDate)) {
      errors.push({
        file: fileName,
        field: `projects[${index}].endDate`,
        message: "Invalid ISO date format (YYYY-MM-DD)",
        value: project.endDate,
      });
    }

    // Validate team size
    if (project.teamSize !== undefined && project.teamSize < 1) {
      errors.push({
        file: fileName,
        field: `projects[${index}].teamSize`,
        message: "Team size must be at least 1",
        value: project.teamSize,
      });
    }

    // Validate technologies array
    if (
      !Array.isArray(project.technologies) ||
      project.technologies.length === 0
    ) {
      errors.push({
        file: fileName,
        field: `projects[${index}].technologies`,
        message: "Project must have at least one technology",
        value: project.technologies.length,
      });
    }

    // Validate project links
    if (project.links) {
      project.links.forEach((link, linkIndex) => {
        if (!link.url || !isValidUrl(link.url)) {
          errors.push({
            file: fileName,
            field: `projects[${index}].links[${linkIndex}].url`,
            message: "Invalid URL format",
            value: link.url,
          });
        }
      });
    }
  });

  return errors;
}

function validateEducation(): ValidationError[] {
  const errors: ValidationError[] = [];
  const fileName = "education.ts";

  // Validate education degrees
  education.forEach((degree, index) => {
    const requiredFields: (keyof EducationDegree)[] = [
      "id",
      "degree",
      "field",
      "institution",
      "location",
      "startDate",
      "endDate",
    ];

    for (const field of requiredFields) {
      const error = validateRequired(
        degree[field],
        `education[${index}].${field}`,
        fileName
      );
      if (error) errors.push(error);
    }

    // Validate dates
    if (degree.startDate && !isValidISODate(degree.startDate)) {
      errors.push({
        file: fileName,
        field: `education[${index}].startDate`,
        message: "Invalid ISO date format (YYYY-MM-DD)",
        value: degree.startDate,
      });
    }

    if (degree.endDate && !isValidISODate(degree.endDate)) {
      errors.push({
        file: fileName,
        field: `education[${index}].endDate`,
        message: "Invalid ISO date format (YYYY-MM-DD)",
        value: degree.endDate,
      });
    }
  });

  // Validate certifications
  certifications.forEach((cert, index) => {
    const requiredFields: (keyof Certification)[] = [
      "id",
      "name",
      "issuer",
      "issueDate",
      "description",
      "skills",
      "category",
    ];

    for (const field of requiredFields) {
      const error = validateRequired(
        cert[field],
        `certifications[${index}].${field}`,
        fileName
      );
      if (error) errors.push(error);
    }

    // Validate dates
    if (cert.issueDate && !isValidISODate(cert.issueDate)) {
      errors.push({
        file: fileName,
        field: `certifications[${index}].issueDate`,
        message: "Invalid ISO date format (YYYY-MM-DD)",
        value: cert.issueDate,
      });
    }

    if (cert.expiryDate && !isValidISODate(cert.expiryDate)) {
      errors.push({
        file: fileName,
        field: `certifications[${index}].expiryDate`,
        message: "Invalid ISO date format (YYYY-MM-DD)",
        value: cert.expiryDate,
      });
    }

    // Validate URLs
    if (cert.credentialUrl && !isValidUrl(cert.credentialUrl)) {
      errors.push({
        file: fileName,
        field: `certifications[${index}].credentialUrl`,
        message: "Invalid URL format",
        value: cert.credentialUrl,
      });
    }
  });

  return errors;
}

// Main validation function
export function validateAllConfigurations(): ValidationResult {
  const allErrors: ValidationError[] = [];

  try {
    // Validate each configuration file
    allErrors.push(...validatePersonalInfo());
    allErrors.push(...validateSkills());
    allErrors.push(...validateThemes());
    allErrors.push(...validateProjects());
    allErrors.push(...validateEducation());
  } catch (error) {
    allErrors.push({
      file: "validation.ts",
      field: "validation",
      message: `Validation process failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      value: error,
    });
  }

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: [], // Can be extended for warnings in the future
  };
}

// Export validation function for build process
export function validateConfigurationsForBuild(): void {
  const result = validateAllConfigurations();

  if (!result.isValid) {
    console.error("\n❌ Configuration Validation Failed:");
    console.error("=====================================");

    result.errors.forEach((error) => {
      console.error(`\n🔴 Error in ${error.file}:`);
      console.error(`   Field: ${error.field}`);
      console.error(`   Message: ${error.message}`);
      if (error.value !== undefined) {
        console.error(`   Value: ${JSON.stringify(error.value)}`);
      }
    });

    console.error(`\n❌ Total errors: ${result.errors.length}`);
    console.error(
      "\nPlease fix these errors before building the application.\n"
    );

    // Exit with error code to fail the build
    process.exit(1);
  } else {
    console.log("\n✅ Configuration Validation Passed:");
    console.log("===================================");
    console.log("✅ Personal Info: Valid");
    console.log("✅ Skills: Valid");
    console.log("✅ Themes: Valid");
    console.log("✅ Projects: Valid");
    console.log("✅ Education: Valid");
    console.log("\n🎉 All configuration files are valid!\n");
  }
}

// Auto-run validation if this file is executed directly
if (require.main === module) {
  validateConfigurationsForBuild();
}

export default {
  validateAllConfigurations,
  validateConfigurationsForBuild,
};
