// Personal Information Configuration
// This file contains personal details used throughout the portfolio

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  experience: string;
  availability: string;
  tagline: string;
  bio: string;
  socialLinks: SocialLink[];
  // New fields for better centralization
  seo: SEOInfo;
  resumeFile: ResumeFileInfo;
  images: ImageInfo;
  contact: ContactInfo;
}

export interface SocialLink {
  platform: string;
  url: string;
  username: string;
}

export interface SEOInfo {
  metaTitle: string;
  metaDescription: string;
  siteName: string;
  siteUrl: string;
  keywords: string[];
  ogImage?: string;
}

export interface ResumeFileInfo {
  filename: string;
  path: string;
  downloadName: string;
  displayName: string;
}

export interface ImageInfo {
  profileImage: {
    src: string;
    alt: string;
    description: string;
  };
  fallbackInitials: string;
}

export interface ContactInfo {
  preferredEmail: string;
  responseTime: string;
  availability: string;
  timeZone: string;
}

export const personalInfo: PersonalInfo = {
  name: "Yogesh Patil",
  title: "Software Development Engineer",
  email: "",
  location: "New York, USA",
  experience: "4+ years",
  availability: "Open to opportunities",
  tagline:
    "Building scalable AI-powered solutions with modern web technologies",
  bio: "Passionate Software Development Engineer specializing in GenAI solutions, cloud architecture, and full-stack development. With 4+ years of experience building scalable systems at companies like Impel AI and Tech Prescient, I focus on creating intelligent automation that drives real business impact. Expert in LangChain, AWS, and modern JavaScript/TypeScript ecosystems.",

  // SEO Configuration
  seo: {
    metaTitle: "Yogesh Patil - Software Development Engineer",
    metaDescription:
      "Portfolio website of Yogesh Patil, a passionate Software Development Engineer with 4+ years of experience building scalable AI-powered solutions and modern web applications.",
    siteName: "Yogesh Patil Portfolio",
    siteUrl: "https://iamyogesh.com",
    keywords: [
      "Software Development Engineer",
      "Full Stack Developer",
      "GenAI Engineer",
      "React Developer",
      "Node.js Developer",
      "AI Solutions",
      "LangChain",
      "Cloud Architecture",
      "TypeScript",
      "Portfolio",
    ],
    ogImage: "/images/og-image.jpg",
  },

  // Resume File Configuration
  resumeFile: {
    filename: "Yogesh-Patil-Resume.pdf",
    path: "/documents/Yogesh-Patil-Resume.pdf",
    downloadName: "Yogesh-Patil-Resume.pdf",
    displayName: "Resume",
  },

  // Image Configuration
  images: {
    profileImage: {
      src: "/images/profile/profile.jpg",
      alt: "Yogesh Patil - Software Development Engineer",
      description: "Professional headshot of Yogesh Patil",
    },
    fallbackInitials: "YP",
  },

  // Contact Configuration
  contact: {
    preferredEmail: "",
    responseTime: "within 4 hours",
    availability: "Available for calls",
    timeZone: "EST (New York)",
  },

  socialLinks: [
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/yogeshpatil28",
      username: "yogeshpatil28",
    },
    {
      platform: "GitHub",
      url: "https://github.com/officialYogesh",
      username: "officialYogesh",
    },
    {
      platform: "Portfolio",
      url: "https://iamyogesh.com",
      username: "iamyogesh.com",
    },
    {
      platform: "Email",
      url: "/contact",
      username: "Contact Form",
    },
  ],
};

// Helper functions for easy access
export const getResumeUrl = () => personalInfo.resumeFile.path;
export const getResumeDownloadName = () => personalInfo.resumeFile.downloadName;
export const getProfileImageAlt = () => personalInfo.images.profileImage.alt;
export const getSocialLinkByPlatform = (platform: string) =>
  personalInfo.socialLinks.find(
    (link) => link.platform.toLowerCase() === platform.toLowerCase()
  );

export default personalInfo;
