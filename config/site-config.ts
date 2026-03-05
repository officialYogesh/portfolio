// Site Configuration
// This file contains site-wide configuration and constants

import { personalInfo } from "./personal-info";

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  author: string;
  creator: string;
  navigation: NavigationItem[];
  footer: FooterConfig;
  features: FeatureFlags;
  analytics: AnalyticsConfig;
  contact: ContactConfig;
}

export interface NavigationItem {
  name: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface FooterConfig {
  copyright: string;
  links: FooterLinkGroup[];
  socialLinks: boolean;
  newsletter: boolean;
}

export interface FooterLinkGroup {
  title: string;
  links: NavigationItem[];
}

export interface FeatureFlags {
  analytics: boolean;
  newsletter: boolean;
  blog: boolean;
  darkMode: boolean;
  animations: boolean;
  contactForm: boolean;
}

export interface AnalyticsConfig {
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  hotjarId?: string;
  enabled: boolean;
}

export interface ContactConfig {
  responseTime: string;
  availability: string;
  preferredMethods: string[];
  schedulingLink?: string;
  calendarLink?: string;
}

export const siteConfig: SiteConfig = {
  name: personalInfo.seo.siteName,
  description: personalInfo.seo.metaDescription,
  url: personalInfo.seo.siteUrl,
  ogImage: personalInfo.seo.ogImage || "/images/og-image.jpg",
  author: personalInfo.name,
  creator: personalInfo.name,

  navigation: [
    {
      name: "Home",
      href: "/",
      description: "Welcome & Overview",
    },
    {
      name: "About",
      href: "/about",
      description: "My Story & Background",
    },
    {
      name: "Projects",
      href: "/projects",
      description: "Technical Portfolio",
    },
    {
      name: "Resume",
      href: "/resume",
      description: "Professional Summary",
    },
    {
      name: "Contact",
      href: "/contact",
      description: "Get in Touch",
    },
  ],

  footer: {
    copyright: `© ${new Date().getFullYear()} ${
      personalInfo.name
    }. All rights reserved.`,
    links: [
      {
        title: "Navigation",
        links: [
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
          { name: "Projects", href: "/projects" },
          { name: "Resume", href: "/resume" },
          { name: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Resources",
        links: [
          { name: "Download Resume", href: personalInfo.resumeFile.path },
          {
            name: "LinkedIn",
            href:
              personalInfo.socialLinks.find(
                (link) => link.platform === "LinkedIn"
              )?.url || "#",
            external: true,
          },
          {
            name: "GitHub",
            href:
              personalInfo.socialLinks.find(
                (link) => link.platform === "GitHub"
              )?.url || "#",
            external: true,
          },
        ],
      },
    ],
    socialLinks: true,
    newsletter: false,
  },

  features: {
    analytics: true,
    newsletter: false,
    blog: false,
    darkMode: true,
    animations: true,
    contactForm: true,
  },

  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID,
    hotjarId: process.env.NEXT_PUBLIC_HOTJAR_ID,
    enabled: process.env.NODE_ENV === "production",
  },

  contact: {
    responseTime: personalInfo.contact.responseTime,
    availability: personalInfo.contact.availability,
    preferredMethods: ["Email", "LinkedIn", "Phone"],
    schedulingLink: process.env.NEXT_PUBLIC_SCHEDULING_LINK,
    calendarLink: process.env.NEXT_PUBLIC_CALENDAR_LINK,
  },
};

// Helper functions
export const getNavigationItems = () => siteConfig.navigation;
export const getFooterConfig = () => siteConfig.footer;
export const getFeatureFlags = () => siteConfig.features;
export const isFeatureEnabled = (feature: keyof FeatureFlags) =>
  siteConfig.features[feature];
export const getAnalyticsConfig = () => siteConfig.analytics;
export const getContactConfig = () => siteConfig.contact;

// SEO helpers
export const generatePageTitle = (pageTitle?: string) => {
  if (!pageTitle) return siteConfig.name;
  return `${pageTitle} | ${siteConfig.name}`;
};

export const generatePageDescription = (pageDescription?: string) => {
  return pageDescription || siteConfig.description;
};

export const generatePageUrl = (path: string) => {
  return `${siteConfig.url}${path}`;
};

export default siteConfig;
