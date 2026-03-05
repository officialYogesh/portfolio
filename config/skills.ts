// Skills Configuration
// This file contains all technical skills and their proficiency levels

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: number; // 1-10 scale
  experience: string; // Years of experience
  icon?: string; // Icon name or path
  color?: string; // Theme color for bubble UI
}

export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "tools"
  | "cloud"
  | "testing"
  | "mobile"
  | "ai";

export interface SkillCategoryInfo {
  name: string;
  displayName: string;
  description: string;
  color: string;
}

export const skillCategories: Record<SkillCategory, SkillCategoryInfo> = {
  frontend: {
    name: "frontend",
    displayName: "Frontend",
    description: "Modern frontend frameworks and libraries",
    color: "hsl(200, 100%, 60%)",
  },
  backend: {
    name: "backend",
    displayName: "Backend",
    description: "Server-side technologies and frameworks",
    color: "hsl(120, 50%, 50%)",
  },
  database: {
    name: "database",
    displayName: "Database",
    description: "Database systems and data storage",
    color: "hsl(270, 50%, 60%)",
  },
  tools: {
    name: "tools",
    displayName: "Tools & DevOps",
    description: "Development tools and CI/CD",
    color: "hsl(30, 80%, 60%)",
  },
  cloud: {
    name: "cloud",
    displayName: "Cloud",
    description: "Cloud platforms and services",
    color: "hsl(190, 70%, 50%)",
  },
  testing: {
    name: "testing",
    displayName: "Testing",
    description: "Testing frameworks and methodologies",
    color: "hsl(340, 70%, 60%)",
  },
  mobile: {
    name: "mobile",
    displayName: "Mobile",
    description: "Mobile development technologies",
    color: "hsl(260, 60%, 60%)",
  },
  ai: {
    name: "ai",
    displayName: "AI/LLM",
    description: "Artificial Intelligence and Language Models",
    color: "hsl(280, 70%, 65%)",
  },
};

export const skills: Skill[] = [
  // Programming Languages
  {
    name: "Python",
    category: "backend",
    proficiency: 9,
    experience: "4+ years",
    icon: "🐍",
  },
  {
    name: "Node.js",
    category: "backend",
    proficiency: 9,
    experience: "4+ years",
    icon: "🟢",
  },
  {
    name: "JavaScript",
    category: "frontend",
    proficiency: 9,
    experience: "4+ years",
    icon: "🟨",
  },
  {
    name: "TypeScript",
    category: "frontend",
    proficiency: 9,
    experience: "3+ years",
    icon: "📘",
  },
  {
    name: "React",
    category: "frontend",
    proficiency: 9,
    experience: "4+ years",
    icon: "⚛️",
  },
  {
    name: "FastAPI",
    category: "backend",
    proficiency: 8,
    experience: "2+ years",
    icon: "⚡",
  },
  {
    name: "GraphQL",
    category: "backend",
    proficiency: 7,
    experience: "2+ years",
    icon: "🔗",
  },

  // Cloud & DevOps
  {
    name: "AWS Lambda",
    category: "cloud",
    proficiency: 8,
    experience: "3+ years",
    icon: "λ",
  },
  {
    name: "AWS API Gateway",
    category: "cloud",
    proficiency: 8,
    experience: "3+ years",
    icon: "🚪",
  },
  {
    name: "AWS S3",
    category: "cloud",
    proficiency: 8,
    experience: "3+ years",
    icon: "🪣",
  },
  {
    name: "AWS CloudWatch",
    category: "cloud",
    proficiency: 7,
    experience: "2+ years",
    icon: "👁️",
  },
  {
    name: "AWS SNS/SQS",
    category: "cloud",
    proficiency: 8,
    experience: "2+ years",
    icon: "📨",
  },
  {
    name: "GCP Cloud Functions",
    category: "cloud",
    proficiency: 7,
    experience: "2+ years",
    icon: "☁️",
  },
  {
    name: "Firebase",
    category: "cloud",
    proficiency: 7,
    experience: "2+ years",
    icon: "🔥",
  },
  {
    name: "Docker",
    category: "tools",
    proficiency: 8,
    experience: "3+ years",
    icon: "🐳",
  },
  {
    name: "Kubernetes",
    category: "tools",
    proficiency: 7,
    experience: "2+ years",
    icon: "☸️",
  },
  {
    name: "GitHub Actions",
    category: "tools",
    proficiency: 8,
    experience: "3+ years",
    icon: "🔄",
  },
  {
    name: "CI/CD",
    category: "tools",
    proficiency: 8,
    experience: "3+ years",
    icon: "🚀",
  },

  // Databases
  {
    name: "PostgreSQL",
    category: "database",
    proficiency: 8,
    experience: "4+ years",
    icon: "🐘",
  },
  {
    name: "MongoDB",
    category: "database",
    proficiency: 8,
    experience: "4+ years",
    icon: "🍃",
  },
  {
    name: "Redis",
    category: "database",
    proficiency: 8,
    experience: "3+ years",
    icon: "🔴",
  },
  {
    name: "DynamoDB",
    category: "database",
    proficiency: 7,
    experience: "2+ years",
    icon: "⚡",
  },
  {
    name: "SQL",
    category: "database",
    proficiency: 9,
    experience: "4+ years",
    icon: "🗄️",
  },

  // AI/LLM Technologies
  {
    name: "LangChain",
    category: "ai",
    proficiency: 9,
    experience: "1+ years",
    icon: "🦜",
  },
  {
    name: "RAG",
    category: "ai",
    proficiency: 8,
    experience: "1+ years",
    icon: "🔍",
  },
  {
    name: "Prompt Engineering",
    category: "ai",
    proficiency: 8,
    experience: "1+ years",
    icon: "💬",
  },
  {
    name: "A/B Testing",
    category: "ai",
    proficiency: 7,
    experience: "2+ years",
    icon: "🧪",
  },
  {
    name: "LLM Integration",
    category: "ai",
    proficiency: 8,
    experience: "1+ years",
    icon: "🤖",
  },
  {
    name: "OpenAI GPT",
    category: "ai",
    proficiency: 8,
    experience: "1+ years",
    icon: "🧠",
  },

  // Mobile Development Technologies
  {
    name: "Android",
    category: "mobile",
    proficiency: 7,
    experience: "2+ years",
    icon: "🤖",
  },
  {
    name: "iOS",
    category: "mobile",
    proficiency: 7,
    experience: "2+ years",
    icon: "📱",
  },

  // Game Development Technologies
  {
    name: "Unity",
    category: "tools",
    proficiency: 8,
    experience: "2+ years",
    icon: "🎮",
  },
  {
    name: "C#",
    category: "backend",
    proficiency: 7,
    experience: "2+ years",
    icon: "🔷",
  },
  {
    name: "Game Design",
    category: "frontend",
    proficiency: 8,
    experience: "2+ years",
    icon: "🎯",
  },

  // Additional Frontend Technologies
  {
    name: "Next.js",
    category: "frontend",
    proficiency: 8,
    experience: "2+ years",
    icon: "▲",
  },
  {
    name: "HTML5",
    category: "frontend",
    proficiency: 9,
    experience: "4+ years",
    icon: "🌐",
  },
  {
    name: "CSS3",
    category: "frontend",
    proficiency: 8,
    experience: "4+ years",
    icon: "🎨",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    proficiency: 8,
    experience: "2+ years",
    icon: "💨",
  },

  // Architecture & Systems
  {
    name: "Microservices",
    category: "backend",
    proficiency: 8,
    experience: "3+ years",
    icon: "🔧",
  },
  {
    name: "REST APIs",
    category: "backend",
    proficiency: 9,
    experience: "4+ years",
    icon: "🔌",
  },
  {
    name: "Serverless",
    category: "cloud",
    proficiency: 8,
    experience: "2+ years",
    icon: "⚡",
  },
  {
    name: "Event-Driven Architecture",
    category: "backend",
    proficiency: 7,
    experience: "2+ years",
    icon: "📡",
  },
  {
    name: "Message Queues",
    category: "backend",
    proficiency: 7,
    experience: "2+ years",
    icon: "📫",
  },

  // Testing
  {
    name: "Jest",
    category: "testing",
    proficiency: 7,
    experience: "3+ years",
    icon: "🃏",
  },
  {
    name: "Unit Testing",
    category: "testing",
    proficiency: 8,
    experience: "4+ years",
    icon: "✅",
  },

  // Tools
  {
    name: "Git",
    category: "tools",
    proficiency: 9,
    experience: "4+ years",
    icon: "📝",
  },
  {
    name: "VS Code",
    category: "tools",
    proficiency: 9,
    experience: "4+ years",
    icon: "💻",
  },
];

// Helper functions
export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return skills.filter((skill) => skill.category === category);
}

export function getAllCategories(): SkillCategory[] {
  return Object.keys(skillCategories) as SkillCategory[];
}

export function getSkillByName(name: string): Skill | undefined {
  return skills.find(
    (skill) => skill.name.toLowerCase() === name.toLowerCase()
  );
}

export function getTopSkills(limit: number = 10): Skill[] {
  return skills.sort((a, b) => b.proficiency - a.proficiency).slice(0, limit);
}

export function getSkillsWithMinProficiency(minProficiency: number): Skill[] {
  return skills.filter((skill) => skill.proficiency >= minProficiency);
}

export default skills;
