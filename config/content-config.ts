// Content Configuration
// This file contains centralized content for consistency across all pages

import { personalInfo } from "./personal-info";

export interface ContentConfig {
  taglines: TaglineVariations;
  callsToAction: CallToActionConfig;
  messaging: MessagingConfig;
  availability: AvailabilityConfig;
  errors: ErrorMessagesConfig;
  sections: SectionTitlesConfig;
}

export interface TaglineVariations {
  primary: string;
  secondary: string;
  professional: string;
  technical: string;
  recruiting: string;
  alternatives: string[];
}

export interface CallToActionConfig {
  primary: {
    downloadResume: string;
    contact: string;
    viewProjects: string;
    readStory: string;
    getInTouch: string;
  };
  secondary: {
    learnMore: string;
    viewProfile: string;
    connectLinkedIn: string;
    emailDirect: string;
    viewGitHub: string;
  };
  labels: {
    download: string;
    view: string;
    contact: string;
    connect: string;
    explore: string;
  };
}

export interface MessagingConfig {
  professional: {
    summary: string;
    elevator: string;
    bio: string;
    capabilities: string;
  };
  response: {
    timePromise: string;
    availability: string;
    methods: string[];
  };
  recruiting: {
    status: string;
    interestAreas: string[];
    availability: string;
  };
}

export interface AvailabilityConfig {
  status: string;
  responseTime: string;
  workingHours: string;
  timeZone: string;
  preferredContact: string[];
  immediateStart: boolean;
}

export interface ErrorMessagesConfig {
  contactForm: {
    sendError: string;
    tryAgain: string;
    fallback: string;
  };
  resume: {
    downloadError: string;
    fallback: string;
  };
  general: {
    loading: string;
    error: string;
  };
}

export interface SectionTitlesConfig {
  pages: {
    home: string;
    about: string;
    projects: string;
    resume: string;
    contact: string;
  };
  sections: {
    experience: string;
    skills: string;
    education: string;
    achievements: string;
    testimonials: string;
    connect: string;
  };
  subsections: {
    technicalSkills: string;
    workExperience: string;
    impact: string;
    strengths: string;
  };
}

export const contentConfig: ContentConfig = {
  taglines: {
    primary: personalInfo.tagline,
    secondary: "Crafting digital experiences that matter",
    professional: `${personalInfo.title} specializing in GenAI solutions, cloud architecture, and full-stack development`,
    technical:
      "Building scalable AI-powered solutions with modern web technologies",
    recruiting: "SDE specializing in Production AI Systems",
    alternatives: [
      "Transforming ideas into intelligent digital solutions",
      "Where AI meets exceptional user experience",
      "Engineering the future, one line of code at a time",
      "Building tomorrow's technology today",
    ],
  },

  callsToAction: {
    primary: {
      downloadResume: `Download ${personalInfo.resumeFile.displayName}`,
      contact: "Contact Me",
      viewProjects: "View My Work",
      readStory: "Read My Story",
      getInTouch: "Get In Touch",
    },
    secondary: {
      learnMore: "Learn More",
      viewProfile: "View Profile",
      connectLinkedIn: "Connect on LinkedIn",
      emailDirect: "Email Direct",
      viewGitHub: "View GitHub",
    },
    labels: {
      download: "Download",
      view: "View",
      contact: "Contact",
      connect: "Connect",
      explore: "Explore",
    },
  },

  messaging: {
    professional: {
      summary: personalInfo.bio,
      elevator: `${personalInfo.title} with ${personalInfo.experience} of experience building scalable AI-powered solutions and modern web applications.`,
      bio: `Passionate ${personalInfo.title} specializing in GenAI solutions, cloud architecture, and full-stack development. With ${personalInfo.experience} of experience building scalable systems at companies like Impel AI and Tech Prescient, I focus on creating intelligent automation that drives real business impact.`,
      capabilities:
        "Expert in LangChain, AWS, and modern JavaScript/TypeScript ecosystems",
    },
    response: {
      timePromise: personalInfo.contact.responseTime,
      availability: personalInfo.contact.availability,
      methods: [
        "Email for opportunities and detailed discussions",
        "LinkedIn for professional networking",
        "GitHub for code collaboration",
      ],
    },
    recruiting: {
      status: personalInfo.availability,
      interestAreas: [
        "SDE positions",
        "AI Engineering roles",
        "Full Stack Development",
        "Technical Leadership",
      ],
      availability: "",
    },
  },

  availability: {
    status: personalInfo.availability,
    responseTime: personalInfo.contact.responseTime,
    workingHours: "9 AM - 6 PM EST (Flexible for global teams)",
    timeZone: personalInfo.contact.timeZone,
    preferredContact: ["Email", "LinkedIn", "Phone"],
    immediateStart: true,
  },

  errors: {
    contactForm: {
      sendError: "Failed to send message. Please try again later.",
      tryAgain: "Please try again or contact me directly.",
      fallback: `If the issue persists, please email me directly at ${personalInfo.email}`,
    },
    resume: {
      downloadError: "Unable to download resume. Please try again.",
      fallback: `If the download fails, please email me at ${personalInfo.email} for a copy.`,
    },
    general: {
      loading: "Loading...",
      error: "Something went wrong. Please refresh the page.",
    },
  },

  sections: {
    pages: {
      home: "Welcome",
      about: "About Me",
      projects: "Projects",
      resume: "Resume",
      contact: "Contact",
    },
    sections: {
      experience: "Professional Experience",
      skills: "Technical Skills",
      education: "Education",
      achievements: "Achievements",
      testimonials: "Testimonials",
      connect: "Let's Connect",
    },
    subsections: {
      technicalSkills: "Technical Expertise",
      workExperience: "Work Experience",
      impact: "Impact & Results",
      strengths: "Core Strengths",
    },
  },
};

// Helper functions for content access
export const getTagline = (variant: keyof TaglineVariations = "primary") => {
  return contentConfig.taglines[variant];
};

export const getCTA = (category: "primary" | "secondary", action: string) => {
  return contentConfig.callsToAction[category][
    action as keyof (typeof contentConfig.callsToAction)[typeof category]
  ];
};

export const getProfessionalMessage = (
  type: keyof MessagingConfig["professional"]
) => {
  return contentConfig.messaging.professional[type];
};

export const getAvailabilityInfo = () => {
  return {
    status: contentConfig.availability.status,
    response: contentConfig.availability.responseTime,
    contact: contentConfig.availability.preferredContact,
    immediate: contentConfig.availability.immediateStart,
  };
};

export const getResponseTimePromise = () => {
  return `📞 ${contentConfig.availability.status} • ⚡ Responds ${
    contentConfig.availability.responseTime
  } • ${
    contentConfig.availability.immediateStart
      ? "🚀 Can start immediately"
      : "📅 Flexible start date"
  }`;
};

export const getErrorMessage = (
  type: "contactForm" | "resume" | "general",
  subtype: string
) => {
  return contentConfig.errors[type][
    subtype as keyof (typeof contentConfig.errors)[typeof type]
  ];
};

export const getSectionTitle = (
  category: "pages" | "sections" | "subsections",
  key: string
) => {
  return contentConfig.sections[category][
    key as keyof (typeof contentConfig.sections)[typeof category]
  ];
};

// Professional titles with context
export const getProfessionalTitles = () => {
  return {
    current: personalInfo.title,
    alternatives: personalInfo.seo.keywords.filter(
      (keyword) => keyword.includes("Developer") || keyword.includes("Engineer")
    ),
    contextual: {
      resume: "AI Solutions Engineer & Full Stack Developer",
      recruiting: "Senior Software Development Engineer",
      networking: personalInfo.title,
      technical: "GenAI & Full Stack Engineer",
    },
  };
};

export default contentConfig;
