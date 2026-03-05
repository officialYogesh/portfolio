export interface HomePageConfig {
  hero: {
    recruiterHooks: string[];
    professionalTitle: {
      prefix: string;
      main: string;
      specialization: string;
    };
    stats: {
      experience: string;
      availabilityStatus: string;
      availabilityMessage: string;
    };
    description: {
      education: string;
      trackRecord: {
        text: string;
        highlights: Array<{
          text: string;
          type: "primary" | "accent" | "secondary";
        }>;
      };
      conclusion: string;
    };
    technologies: string[];
    typingAnimation: {
      speed: number;
      delay: number;
    };
  };
  sections: {
    achievement: {
      label: string;
      title: string;
      description: string;
      details: string;
      icon: string;
    };
    projects: {
      title: string;
      description: string;
      linkText: string;
    };
    contact: {
      title: string;
      description: string;
      footer: string;
    };
  };
}

export const homeConfig: HomePageConfig = {
  hero: {
    recruiterHooks: [
      "Looking for a Senior SDE who can actually deliver on AI promises?",
      "Need a developer who ships production-ready systems, not just demos?",
      "Want an engineer who's proven they can scale systems under pressure?",
    ],
    professionalTitle: {
      prefix: "SDE",
      main: "specializing in",
      specialization: "Production AI & Cloud Systems",
    },
    stats: {
      experience: "4+ years",
      availabilityStatus: "ACTIVELY LOOKING",
      availabilityMessage: "Available: Immediate start",
    },
    description: {
      education: "Master's in Computer Science (Syracuse University)",
      trackRecord: {
        text: "+ proven track record building scalable",
        highlights: [
          { text: "GenAI applications", type: "primary" },
          { text: "cloud microservices", type: "accent" },
          { text: "high-performance APIs", type: "secondary" },
        ],
      },
      conclusion: "that real users depend on.",
    },
    technologies: [
      "Python",
      "TypeScript",
      "React",
      "AWS",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "LangChain",
      "FastAPI",
      "GraphQL",
    ],
    typingAnimation: {
      speed: 60,
      delay: 5000,
    },
  },
  sections: {
    achievement: {
      label: "LATEST WIN",
      title:
        "🏆 Our team was top performers at IBM TechXchange Hackathon building AI compliance system that reduced manual review by 70% for financial services",
      description:
        "December 2024 • Used IBM Granite models + custom RAG pipeline • Production-ready code",
      details: "reduced manual review by 70%",
      icon: "🏆",
    },
    projects: {
      title: "Innovation in Action",
      description:
        "A showcase of my award-winning hackathon builds and personal projects. This is where I experiment with cutting-edge tech, build rapid prototypes, and bring ambitious ideas to life from the ground up.",
      linkText: "See Full Technical Portfolio →",
    },
    contact: {
      title: "Let's Start a Conversation?",
      description:
        "I'm seeking my next challenge where I can help build high-impact AI and cloud systems. Whether you have a specific role in mind, want to discuss system design, or just think we'd be a good fit, my inbox is open.",
      footer: "",
    },
  },
};

// Helper functions for easy access
export const getRecruiterHooks = () => homeConfig.hero.recruiterHooks;
export const getProfessionalTitle = () => homeConfig.hero.professionalTitle;
export const getHeroStats = () => homeConfig.hero.stats;
export const getHeroDescription = () => homeConfig.hero.description;
export const getTechnologies = () => homeConfig.hero.technologies;
export const getTypingAnimationConfig = () => homeConfig.hero.typingAnimation;
export const getAchievementSection = () => homeConfig.sections.achievement;
export const getProjectsSection = () => homeConfig.sections.projects;
export const getContactSection = () => homeConfig.sections.contact;
