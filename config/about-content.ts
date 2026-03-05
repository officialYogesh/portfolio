// About Page Content Configuration
// This file contains all content for the About page narrative

// Import for data integration
import { personalInfo } from "./personal-info";

export interface StorySection {
  id: string;
  title: string;
  subtitle?: string;
  content: string[];
  anecdote?: string;
  highlight?: string;
  emotion?:
    | "curiosity"
    | "challenge"
    | "growth"
    | "achievement"
    | "reflection"
    | "innovation"
    | "confidence"
    | "vision";
  visualCue?: string; // Icon or visual element
}

export interface PersonalJourney {
  phase: string;
  title: string;
  period: string;
  description: string;
  challenge?: string;
  growth: string;
  keyMoment?: string;
}

export interface WorkPhilosophy {
  principle: string;
  description: string;
  example?: string;
  icon: string;
}

export interface AboutPageContent {
  hero: {
    greeting: string;
    introduction: string;
    tagline: string;
    personalTouch: string;
    professionalImage: {
      src: string;
      alt: string;
      description: string;
    };
    quickStats: Array<{
      label: string;
      value: string;
      description: string;
    }>;
  };
  storyArc: {
    introduction: StorySection;
    journey: StorySection[];
    currentState: StorySection;
    futureAspirations: StorySection;
  };
  workInfo: {
    title: string;
    description: string;
    highlights: string[];
    approach: string;
    link?: string;
  };
  projectsInfo: {
    title: string;
    description: string;
    passion: string;
    link: string;
  };
  offlineInfo: {
    title: string;
    description: string;
    interests: Array<{
      activity: string;
      description: string;
      connection?: string; // How it connects to professional life
    }>;
  };
  connectInfo: {
    title: string;
    description: string;
    invitation: string;
    preferredChannels: string[];
  };
}

// Main About Page Content
export const aboutPageContent: AboutPageContent = {
  hero: {
    greeting: `Hello, my name is ${personalInfo.name.split(" ")[0]}`,
    introduction: `I'm a ${personalInfo.title} specializing in GenAI solutions, cloud architecture, and full-stack development.`,
    tagline: "Crafting digital experiences that matter",
    personalTouch:
      "When I'm not coding, you'll find me exploring new technologies, contributing to open source, or sharing knowledge with the developer community.",
    professionalImage: {
      src: personalInfo.images.profileImage.src,
      alt: personalInfo.images.profileImage.alt,
      description: personalInfo.images.profileImage.description,
    },
    quickStats: [
      {
        label: "Experience",
        value: personalInfo.experience,
        description: "Building scalable systems and AI solutions",
      },
      {
        label: "Current Focus",
        value: "GenAI & LLMs",
        description: "LangChain, RAG, and AI automation",
      },
      {
        label: "Location",
        value: personalInfo.location,
        description: personalInfo.availability,
      },
    ],
  },

  storyArc: {
    introduction: {
      id: "introduction",
      title: "What Happens When Curiosity Meets a Screwdriver?",
      content: [
        "Picture this: a 12-year-old in a cramped Mumbai apartment, surrounded by the scattered remains of his father's radio. The humid air carries the sharp scent of metal and dust, while outside, the familiar chaos of street vendors and auto-rickshaws hums its eternal song. My father watches, a mix of frustration and curiosity creasing his brow, as I hold up a tiny circuit board to the light streaming through our single window.",
        "What started as childhood destruction became my first lesson in creation. Each component told a story, each connection served a purpose. I didn't know it then, but I was asking the question that would shape everything: 'What if this could work better?' Today, that same curiosity drives me to build AI systems that understand human conversations and solve real problems. But the kid with the screwdriver? He's still here, still taking things apart to understand how they tick.",
      ],
      anecdote:
        "When the radio crackled back to life, clearer than ever before, my father's expression shifted from worry to wonder. 'You didn't just fix it,' he said quietly, 'you improved it.' That moment taught me the difference between breaking things and understanding them.",
      emotion: "curiosity",
      visualCue: "🔧",
    },

    journey: [
      {
        id: "foundation-and-dreams",
        title: "When Code Became Canvas",
        subtitle: "University of Mumbai, 2019",
        content: [
          "Computer science textbooks filled our dorm room, but something felt missing. While my classmates memorized algorithms, I found myself sketching game ideas in the margins, wondering: 'What if learning could feel like playing?' The Teknack Hackathon announcement felt like fate calling. Forty-eight hours to build something people would actually use.",
          "Our team chose an ambitious idea: 'Upside Down,' an endless runner where players literally flip between parallel worlds. The normal world was bright and safe, the Upside Down dark and dangerous. As I coded through the night, fueled by chai and determination, watching pixels come alive on my laptop screen, I felt something click. This wasn't just programming, this was digital storytelling.",
          "Three sleepless nights later, we hit submit. Then came the waiting. When the downloads started rolling in, 100, 500, 1,000, I realized people were carrying a piece of our imagination in their pockets. First place at Teknack was just a trophy. But knowing someone smiled during their morning commute because of code I wrote? That was magic.",
        ],
        anecdote:
          "I called my father that night, voice hoarse from excitement and exhaustion. 'Remember your radio?' I asked. 'I'm still fixing things, Dad. Just bigger things now.' His pride traveled across the phone line like electricity.",
        emotion: "achievement",
        visualCue: "🎮",
      },
      {
        id: "enterprise-reality-check",
        title: "The Email That Changed Everything",
        subtitle: "Tech Prescient, 2021",
        content: [
          "The message arrived on a Tuesday morning like any other: 'We need you to lead frontend development for Vonage's user permission system.' I stared at my screen, coffee growing cold in my hands. This wasn't building games for fun anymore. Thousands of Vonage employees would depend on every button, every click, every security decision I made.",
          "The weight of responsibility felt heavier than any algorithm I'd studied. No more 'move fast and break things.' Each React component had to be bulletproof. Every permission check had to protect real business operations. I spent nights sketching user flows on napkins, asking myself that familiar question with new urgency: 'How can I make this work better, but also safer?'",
          "Three months of careful architecture later, watching real employees navigate our system effortlessly, I understood something profound. The curiosity that drove me to dismantle radios had evolved. I wasn't just solving problems anymore, I was designing experiences that made people's work lives a little bit easier.",
        ],
        highlight:
          "Building for enterprise taught me that true innovation isn't about adding features, it's about removing friction from real people's daily lives.",
        emotion: "growth",
        visualCue: "🏢",
      },
      {
        id: "ai-awakening",
        title: "The Day AI Became Personal",
        subtitle: "Impel AI, 2023",
        content: [
          "My first week at Impel AI, I was assigned to build AI that helps car dealerships manage service appointments. It sounded straightforward until I realized what we were actually creating: technology that could understand the frustration in a customer's voice when they said, 'My car's making that weird noise again.'",
          "Working with conversational AI felt like teaching a computer empathy. Our system learned to read between the lines. A worried parent mentioning strange sounds got connected to diagnostic services. A busy professional got appointment times that worked with their schedule. Every conversation our AI handled successfully meant someone's day got a little easier.",
          "The breakthrough came when I helped build a validation system that reduced booking errors by a third. But the real victory wasn't in the percentage, it was in the thank-you emails from customers who didn't have to call back, didn't have to explain their problem twice, didn't have to juggle their calendar for a second appointment.",
        ],
        anecdote:
          "Watching our AI resolve a complex scheduling conflict in real-time, suggesting solutions I hadn't even programmed, I felt that familiar tingle of discovery. The radio-dismantling kid in me whispered: 'Now we're building things that can think ahead.'",
        emotion: "innovation",
        visualCue: "🤖",
      },
    ],

    currentState: {
      id: "current-state",
      title: "Where Two Worlds Meet",
      content: [
        "Walking across Syracuse University's snow-covered campus, I sometimes pause and think about that humid Mumbai apartment. The journey from dismantling radios to designing AI systems feels impossible, yet here I am, bridging two worlds with every line of code I write.",
        "At Impel AI, I don't just build software, I translate human needs into digital solutions. React interfaces that make complex tasks feel simple. Backend systems that scale from dozens to thousands of users without breaking a sweat. AI that makes decisions with the wisdom of human experience. Every project carries the DNA of that curious 12-year-old and the discipline of enterprise engineering.",
        "What excites me most isn't what I've built, it's what becomes possible when technology truly understands human intent. Because that kid with the screwdriver? He's not done asking questions.",
      ],
      highlight:
        "Every problem I solve now carries the thread from Mumbai to Syracuse, connecting curiosity with capability, dreams with delivery.",
      emotion: "confidence",
      visualCue: "🌉",
    },

    futureAspirations: {
      id: "future-aspirations",
      title: "The Problem That Keeps Me Awake",
      content: [
        "There's a specific challenge that lights up my brain at 2 AM. Picture the small business owner in rural India who has brilliant ideas but struggles with technology barriers. Or the family shop in Syracuse that could thrive with better digital tools but can't afford complex enterprise solutions. How do we build AI that bridges these gaps?",
        "I'm working on AI systems that adapt to how people naturally communicate, not forcing them to learn technical language. Technology that understands cultural nuances, adjusts to different communication styles, and meets people exactly where they are. The same curiosity that made me dismantle that radio is now driving me to dismantle the barriers between people and helpful technology.",
        "Success for me looks like this: someday, a small business owner will solve a complex problem using AI I helped create, without even realizing they're using AI. They'll just think, 'Wow, this works exactly how I hoped it would.' That's when I'll know we've built something truly useful.",
      ],
      anecdote:
        "My father's words echo in every algorithm I design: 'Beta, when you fix something, make it better than before.' The radio was just the beginning.",
      emotion: "vision",
      visualCue: "🌱",
    },
  },

  workInfo: {
    title: "What I'm Building Now",
    description:
      "At Impel AI, I'm turning that childhood curiosity into AI systems that understand human conversations. Every day, I work on technology that bridges the gap between complex automotive processes and the people who need them to work seamlessly.",
    highlights: [
      "Teaching AI to understand frustration in a customer's voice",
      "Building systems that anticipate needs before problems arise",
      "Creating technology that feels intuitive, not intimidating",
      "Helping dealerships serve customers better through intelligent automation",
    ],
    approach:
      "The same hands that dismantled radios now architect AI systems that make complex things simple. Every line of code carries forward that question: 'How can this work better?'",
    link: "/resume",
  },

  projectsInfo: {
    title: "Stories in Code",
    description:
      "From award-winning games that transported players between worlds to AI systems that solve real business challenges, my projects reflect a consistent thread: building technology that understands and serves human needs.",
    passion:
      "Each project is a new chapter in the same story - taking complex problems apart to understand them, then rebuilding them in ways that make people's lives a little bit easier.",
    link: "/projects",
  },

  offlineInfo: {
    title: "Beyond the Screen",
    description:
      "The same curiosity that drives me to explore code leads me to explore the world. Each journey teaches me something new about human diversity, cultural context, and the universal challenges that technology should solve.",
    interests: [
      {
        activity: "Cultural Explorer & Digital Empathy Builder",
        description:
          "Standing at Niagara Falls, feeling the raw power of nature, I understood something about scale and systems. Walking through NYC's streets, observing how millions of people navigate complexity daily, I learned about user experience in the real world. In Boston's historic neighborhoods, seeing how old and new coexist, I grasped the art of integrating innovation with established systems. Each destination becomes a lesson in human diversity that shapes how I build technology.",
        connection:
          "Travel isn't escapism for me, it's research. Every culture I encounter, every problem I see people solving differently, every moment of being the outsider trying to understand local customs - these experiences directly influence how I approach building AI that works for everyone, everywhere. The kid who dismantled radios to understand them now dismantles cultural assumptions to build more inclusive technology.",
      },
    ],
  },

  connectInfo: {
    title: "Let's Connect",
    description:
      "I'm always interested in discussing new opportunities, innovative projects, or just talking about the latest developments in AI and software engineering.",
    invitation:
      "Feel free to reach out – I'd love to hear about your projects and explore how we can collaborate or create something amazing together.",
    preferredChannels: [
      "Email for opportunities and detailed discussions",
      "LinkedIn for professional networking",
      "GitHub for code collaboration",
    ],
  },
};

// Export individual sections for easy access
export const {
  hero,
  storyArc,
  workInfo,
  projectsInfo,
  offlineInfo,
  connectInfo,
} = aboutPageContent;
