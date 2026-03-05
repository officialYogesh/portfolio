// Education Configuration
// This file contains all education, certification, and achievement information

export interface EducationDegree {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  gpa?: string; // Optional GPA
  honors?: string[]; // Optional honors/distinctions
  relevantCourses?: string[]; // Optional relevant courses
  activities?: string[]; // Optional extracurricular activities
  description?: string; // Optional description
  logo?: string; // Optional institution logo path
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string; // ISO date string
  expiryDate?: string; // Optional expiry date
  credentialId?: string; // Optional credential ID
  credentialUrl?: string; // Optional verification URL
  description: string;
  skills: string[]; // Related skills
  logo?: string; // Optional issuer logo path
  badge?: string; // Optional badge image path
  category:
    | "cloud"
    | "development"
    | "database"
    | "security"
    | "project-management"
    | "design"
    | "other";
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  category:
    | "award"
    | "recognition"
    | "competition"
    | "publication"
    | "speaking"
    | "contribution"
    | "other";
  organization?: string; // Optional organization/issuer
  location?: string; // Optional location
  url?: string; // Optional URL for more details
  image?: string; // Optional achievement image/certificate
}

export interface OnlineCourse {
  id: string;
  title: string;
  provider: string;
  instructor?: string;
  completionDate: string; // ISO date string
  certificateUrl?: string; // Optional certificate URL
  skills: string[]; // Skills learned
  duration?: string; // Course duration
  description: string;
  category:
    | "frontend"
    | "backend"
    | "mobile"
    | "devops"
    | "design"
    | "data"
    | "business"
    | "other";
}

export const education: EducationDegree[] = [
  {
    id: "syracuse-ms-cs",
    degree: "Master of Science",
    field: "Computer Science",
    institution: "Syracuse University",
    location: "New York, USA",
    startDate: "2023-08-01",
    endDate: "2025-05-31",
    description:
      "Advanced studies in Computer Science with focus on software engineering, artificial intelligence, and distributed systems.",
    relevantCourses: [
      "Machine Learning",
      "Distributed Systems",
      "Software Engineering",
      "Advanced Algorithms",
      "Cloud Computing",
      "Database Systems",
    ],
  },
  {
    id: "mumbai-be-cse",
    degree: "Bachelor of Engineering",
    field: "Computer Science Engineering",
    institution: "University Of Mumbai",
    location: "Mumbai, India",
    startDate: "2016-08-01",
    endDate: "2020-05-31",
    description:
      "Comprehensive undergraduate program in Computer Science Engineering covering fundamentals of programming, data structures, algorithms, and software development.",
    relevantCourses: [
      "Data Structures and Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Computer Networks",
      "Operating Systems",
      "Software Engineering",
      "Web Technologies",
      "System Programming",
    ],
  },
];

export const certifications: Certification[] = [
  {
    id: "aws-cloud-practitioner",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issueDate: "2023-03-15",
    credentialUrl: "https://aws.amazon.com/certification/",
    description:
      "Foundational understanding of AWS Cloud services and architecture",
    skills: ["AWS", "Cloud Computing", "Cloud Architecture"],
    category: "cloud",
  },
  {
    id: "langchain-certification",
    name: "LangChain for LLM Application Development",
    issuer: "DeepLearning.AI",
    issueDate: "2024-02-10",
    description:
      "Specialized training in building LLM applications using LangChain framework",
    skills: ["LangChain", "LLM", "AI", "Python"],
    category: "development",
  },
];

export const achievements: Achievement[] = [
  {
    id: "ibm-techxchange-hackathon",
    title: "IBM TechXchange Pre-Conference watsonx Hackathon Achievement",
    description:
      "Built AI-Powered Regulatory Compliance Assistant for financial services using IBM watsonx.ai and Granite foundation models, focusing on Basel III, Dodd-Frank Act, MiFID II, and GDPR compliance automation",
    date: "2024-11-01",
    category: "competition",
    organization: "IBM TechXchange Conference 2024",
    location: "Las Vegas, USA",
    url: "https://www.linkedin.com/pulse/excited-share-our-achievement-ibm-techxchange-watsonx-yogesh-patil-tly3e/",
  },
  {
    id: "revenue-enablement",
    title: "Enabled $100K+ Projected Revenue",
    description:
      "Built greenfield microservice unifying 100+ oceanographic data sources for Maxar, transforming maritime analytics and enabling significant revenue opportunities",
    date: "2023-05-01",
    category: "contribution",
    organization: "Tech Prescient - Maxar Project",
  },
  {
    id: "teknack-game-hackathon-winner",
    title: "1st Place - Teknack Game Development Hackathon 2019",
    description:
      "Won first place with 'Upside Down' - an endless runner game inspired by Stranger Things where players swipe between parallel worlds collecting coins and dodging enemies. Achieved 1,000+ downloads on Google Play Store and Apple App Store",
    date: "2019-03-01",
    category: "competition",
    organization: "ACM DBIT Student Chapter - Teknack Gaming Studio",
    location: "Mumbai, India",
    url: "https://teknack.in/hall-of-fame/",
  },
];

export const onlineCourses: OnlineCourse[] = [
  {
    id: "advanced-react-patterns",
    title: "Advanced React Patterns",
    provider: "Frontend Masters",
    instructor: "Kent C. Dodds",
    completionDate: "2023-05-15",
    certificateUrl:
      "https://frontendmasters.com/certificates/YP-React-Advanced",
    skills: [
      "React Hooks",
      "Context API",
      "Compound Components",
      "Render Props",
    ],
    duration: "8 hours",
    description:
      "Deep dive into advanced React patterns and architectural decisions for building scalable applications.",
    category: "frontend",
  },
  {
    id: "system-design-fundamentals",
    title: "System Design Fundamentals",
    provider: "Educative",
    completionDate: "2023-07-22",
    skills: [
      "System Architecture",
      "Database Design",
      "Scalability",
      "Load Balancing",
    ],
    duration: "12 hours",
    description:
      "Comprehensive course covering system design principles for building large-scale distributed systems.",
    category: "backend",
  },
  {
    id: "typescript-masterclass",
    title: "TypeScript: The Complete Developer's Guide",
    provider: "Udemy",
    instructor: "Stephen Grider",
    completionDate: "2022-09-10",
    certificateUrl: "https://udemy.com/certificate/UC-YP-TypeScript-2022",
    skills: ["TypeScript", "Type Systems", "Generics", "Decorators"],
    duration: "24 hours",
    description:
      "Master TypeScript from basics to advanced topics including generics, decorators, and integration with React.",
    category: "other",
  },
];

// Helper functions for data access
export function getEducationById(id: string): EducationDegree | undefined {
  return education.find((edu) => edu.id === id);
}

export function getCertificationById(id: string): Certification | undefined {
  return certifications.find((cert) => cert.id === id);
}

export function getAchievementById(id: string): Achievement | undefined {
  return achievements.find((achievement) => achievement.id === id);
}

export function getCertificationsByCategory(
  category: Certification["category"]
): Certification[] {
  return certifications.filter((cert) => cert.category === category);
}

export function getAchievementsByCategory(
  category: Achievement["category"]
): Achievement[] {
  return achievements.filter(
    (achievement) => achievement.category === category
  );
}

export function getActiveCertifications(): Certification[] {
  const now = new Date();
  return certifications.filter((cert) => {
    if (!cert.expiryDate) return true; // No expiry date means always active
    return new Date(cert.expiryDate) > now;
  });
}

export function getRecentAchievements(limit: number = 3): Achievement[] {
  return achievements
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getAllSkillsFromEducation(): string[] {
  const skills = new Set<string>();

  // Add skills from certifications
  certifications.forEach((cert) => {
    cert.skills.forEach((skill) => skills.add(skill));
  });

  // Add skills from online courses
  onlineCourses.forEach((course) => {
    course.skills.forEach((skill) => skills.add(skill));
  });

  return Array.from(skills).sort();
}

export default {
  education,
  certifications,
  achievements,
  onlineCourses,
};
