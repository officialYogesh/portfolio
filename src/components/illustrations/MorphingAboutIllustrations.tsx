"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

import {
  MorphingIllustration,
  MorphingShape,
} from "../animations/MorphingIllustration";

// Task 5.3.2: Implement morphing illustration animations

// Career progression morphing - from student to professional
export const CareerProgressionMorph: React.FC<{
  className?: string;
  autoPlay?: boolean;
  interval?: number;
}> = ({ className = "", autoPlay = true, interval = 4000 }) => {
  const careerStages: MorphingShape[] = [
    {
      id: "student",
      path: "M200 100 L200 150 M175 120 L225 120 M180 160 L220 160 M185 140 L215 140", // Student with books
      fillColor: "hsl(var(--primary) / 0.3)",
      strokeColor: "hsl(var(--primary))",
      strokeWidth: 3,
      duration: 1.5,
    },
    {
      id: "intern",
      path: "M180 100 L220 100 L220 140 L180 140 Z M190 110 L210 110 M190 120 L210 120 M190 130 L210 130", // Computer screen
      fillColor: "hsl(var(--secondary) / 0.3)",
      strokeColor: "hsl(var(--secondary))",
      strokeWidth: 3,
      duration: 1.5,
    },
    {
      id: "junior",
      path: "M170 90 L230 90 L230 150 L170 150 Z M180 100 L220 100 M180 110 L220 110 M180 120 L220 120 M180 130 L220 130 M180 140 L220 140", // Laptop with code
      fillColor: "hsl(var(--accent) / 0.3)",
      strokeColor: "hsl(var(--accent))",
      strokeWidth: 3,
      duration: 1.5,
    },
    {
      id: "senior",
      path: "M150 80 L250 80 L250 160 L150 160 Z M160 90 L240 90 M160 100 L240 100 M160 110 L180 110 M200 110 L240 110 M160 120 L190 120 M210 120 L240 120 M160 130 L240 130 M160 140 L200 140 M220 140 L240 140 M160 150 L240 150", // Multiple monitors
      fillColor: "hsl(var(--primary) / 0.4)",
      strokeColor: "hsl(var(--primary))",
      strokeWidth: 3,
      duration: 1.5,
    },
  ];

  return (
    <div className={`relative ${className}`}>
      <MorphingIllustration
        shapes={careerStages}
        autoPlay={autoPlay}
        interval={interval}
        width={300}
        height={200}
        viewBox="0 0 400 200"
        triggerOnInView={true}
        loop={true}
      />

      {/* Stage labels */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex space-x-2">
          {["Student", "Intern", "Junior", "Senior"].map((stage, i) => (
            <motion.div
              key={stage}
              className="w-2 h-2 rounded-full bg-primary"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2, duration: 0.4 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// Skill evolution morphing - from basic to advanced
export const SkillEvolutionMorph: React.FC<{
  className?: string;
  skill: "frontend" | "backend" | "fullstack";
  autoPlay?: boolean;
}> = ({ className = "", skill = "frontend", autoPlay = true }) => {
  const skillPaths = {
    frontend: [
      {
        id: "html-css",
        path: "M180 120 L220 120 L220 160 L180 160 Z M185 125 L215 125 M185 135 L210 135 M185 145 L205 145",
        fillColor: "hsl(var(--primary) / 0.2)",
        strokeColor: "hsl(var(--primary))",
        strokeWidth: 2,
      },
      {
        id: "javascript",
        path: "M170 110 L230 110 L230 170 L170 170 Z M175 115 L225 115 M175 125 L220 125 M175 135 L215 135 M175 145 L210 145 M175 155 L225 155",
        fillColor: "hsl(var(--secondary) / 0.2)",
        strokeColor: "hsl(var(--secondary))",
        strokeWidth: 2,
      },
      {
        id: "react",
        path: "M160 100 L240 100 L240 180 L160 180 Z M200 140 m-30,0 a30,30 0 1,0 60,0 a30,30 0 1,0 -60,0 M170 120 L230 120 M170 160 L230 160",
        fillColor: "hsl(var(--accent) / 0.2)",
        strokeColor: "hsl(var(--accent))",
        strokeWidth: 2,
      },
      {
        id: "nextjs",
        path: "M150 90 L250 90 L250 190 L150 190 Z M160 100 L240 100 M160 110 L240 110 M160 120 L240 120 M160 130 L240 130 M160 140 L240 140 M160 150 L240 150 M160 160 L240 160 M160 170 L240 170 M160 180 L240 180",
        fillColor: "hsl(var(--primary) / 0.3)",
        strokeColor: "hsl(var(--primary))",
        strokeWidth: 2,
      },
    ],
    backend: [
      {
        id: "server",
        path: "M180 130 L220 130 L220 150 L180 150 Z M190 135 L210 135 M190 145 L210 145",
        fillColor: "hsl(var(--primary) / 0.2)",
        strokeColor: "hsl(var(--primary))",
        strokeWidth: 2,
      },
      {
        id: "database",
        path: "M170 120 L230 120 L230 160 L170 160 Z M175 125 L225 125 M175 135 L225 135 M175 145 L225 145 M175 155 L225 155",
        fillColor: "hsl(var(--secondary) / 0.2)",
        strokeColor: "hsl(var(--secondary))",
        strokeWidth: 2,
      },
      {
        id: "api",
        path: "M160 110 L240 110 L240 170 L160 170 Z M200 140 m-25,0 a25,25 0 1,0 50,0 a25,25 0 1,0 -50,0 M175 120 L225 120 M175 160 L225 160",
        fillColor: "hsl(var(--accent) / 0.2)",
        strokeColor: "hsl(var(--accent))",
        strokeWidth: 2,
      },
      {
        id: "microservices",
        path: "M150 100 L250 100 L250 180 L150 180 Z M160 110 L190 110 L190 130 L160 130 Z M210 110 L240 110 L240 130 L210 130 Z M160 150 L190 150 L190 170 L160 170 Z M210 150 L240 150 L240 170 L210 170 Z",
        fillColor: "hsl(var(--primary) / 0.3)",
        strokeColor: "hsl(var(--primary))",
        strokeWidth: 2,
      },
    ],
    fullstack: [
      {
        id: "basic",
        path: "M200 140 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0",
        fillColor: "hsl(var(--primary) / 0.2)",
        strokeColor: "hsl(var(--primary))",
        strokeWidth: 2,
      },
      {
        id: "intermediate",
        path: "M200 140 m-30,0 a30,30 0 1,0 60,0 a30,30 0 1,0 -60,0 M180 140 L220 140 M200 120 L200 160",
        fillColor: "hsl(var(--secondary) / 0.2)",
        strokeColor: "hsl(var(--secondary))",
        strokeWidth: 2,
      },
      {
        id: "advanced",
        path: "M200 140 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0 M170 140 L230 140 M200 110 L200 170 M175 120 L225 120 M175 160 L225 160",
        fillColor: "hsl(var(--accent) / 0.2)",
        strokeColor: "hsl(var(--accent))",
        strokeWidth: 2,
      },
      {
        id: "expert",
        path: "M200 140 m-50,0 a50,50 0 1,0 100,0 a50,50 0 1,0 -100,0 M160 140 L240 140 M200 100 L200 180 M170 110 L230 110 M170 170 L230 170 M170 120 L230 120 M170 160 L230 160 M170 130 L230 130 M170 150 L230 150",
        fillColor: "hsl(var(--primary) / 0.3)",
        strokeColor: "hsl(var(--primary))",
        strokeWidth: 2,
      },
    ],
  };

  return (
    <div className={className}>
      <MorphingIllustration
        shapes={skillPaths[skill]}
        autoPlay={autoPlay}
        interval={3000}
        width={250}
        height={180}
        viewBox="0 0 400 280"
        triggerOnInView={true}
        loop={true}
      />
    </div>
  );
};

// Philosophy evolution morphing
export const PhilosophyMorph: React.FC<{
  className?: string;
  autoPlay?: boolean;
}> = ({ className = "", autoPlay = true }) => {
  const philosophyShapes: MorphingShape[] = [
    {
      id: "learn",
      path: "M200 140 L170 110 L170 170 L200 140 L230 170 L230 110 Z", // Book/Learning
      fillColor: "hsl(var(--primary) / 0.2)",
      strokeColor: "hsl(var(--primary))",
      strokeWidth: 3,
      duration: 2,
    },
    {
      id: "code",
      path: "M160 120 L240 120 L240 160 L160 160 Z M170 130 L175 135 L170 140 M190 140 L210 140 M220 130 L225 135 L220 140", // Code editor
      fillColor: "hsl(var(--secondary) / 0.2)",
      strokeColor: "hsl(var(--secondary))",
      strokeWidth: 3,
      duration: 2,
    },
    {
      id: "collaborate",
      path: "M200 130 m-15,0 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0 M170 150 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0 M230 150 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0", // Team collaboration
      fillColor: "hsl(var(--accent) / 0.2)",
      strokeColor: "hsl(var(--accent))",
      strokeWidth: 3,
      duration: 2,
    },
    {
      id: "innovate",
      path: "M200 140 m-30,0 a30,30 0 1,0 60,0 a30,30 0 1,0 -60,0 M200 120 L200 140 L215 135 M200 140 L215 145 M185 125 L195 135 M205 135 L215 125", // Innovation/Lightbulb
      fillColor: "hsl(var(--primary) / 0.3)",
      strokeColor: "hsl(var(--primary))",
      strokeWidth: 3,
      duration: 2,
    },
  ];

  return (
    <div className={className}>
      <MorphingIllustration
        shapes={philosophyShapes}
        autoPlay={autoPlay}
        interval={4000}
        width={280}
        height={200}
        viewBox="0 0 400 280"
        triggerOnInView={true}
        loop={true}
      />
    </div>
  );
};

// Interactive story morphing based on scroll position
export const InteractiveStoryMorph: React.FC<{
  className?: string;
  triggerElements: string[]; // Array of element IDs to watch
}> = ({ className = "", triggerElements }) => {
  const [currentShape, setCurrentShape] = useState(0);

  const storyShapes: MorphingShape[] = [
    {
      id: "beginning",
      path: "M200 140 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0", // Simple circle - beginning
      fillColor: "hsl(var(--primary) / 0.2)",
      strokeColor: "hsl(var(--primary))",
      strokeWidth: 2,
      duration: 1.5,
    },
    {
      id: "growth",
      path: "M200 140 L180 120 L180 160 L200 140 L220 160 L220 120 Z", // Diamond - growth/challenge
      fillColor: "hsl(var(--secondary) / 0.2)",
      strokeColor: "hsl(var(--secondary))",
      strokeWidth: 2,
      duration: 1.5,
    },
    {
      id: "expertise",
      path: "M200 120 L215 135 L200 150 L185 135 Z M200 110 L220 140 L200 170 L180 140 Z", // Star - expertise
      fillColor: "hsl(var(--accent) / 0.2)",
      strokeColor: "hsl(var(--accent))",
      strokeWidth: 2,
      duration: 1.5,
    },
    {
      id: "future",
      path: "M200 140 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0 M160 140 L240 140 M200 100 L200 180", // Complex - future possibilities
      fillColor: "hsl(var(--primary) / 0.3)",
      strokeColor: "hsl(var(--primary))",
      strokeWidth: 2,
      duration: 1.5,
    },
  ];

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    triggerElements.forEach((elementId, index) => {
      const element = document.getElementById(elementId);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setCurrentShape(index);
            }
          },
          { threshold: 0.5 }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [triggerElements]);

  return (
    <motion.div
      className={`fixed right-8 top-1/2 transform -translate-y-1/2 z-10 ${className}`}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <MorphingIllustration
          shapes={storyShapes}
          currentShapeIndex={currentShape}
          autoPlay={false}
          width={120}
          height={120}
          viewBox="0 0 400 280"
        />

        {/* Progress indicators */}
        <div className="flex justify-center mt-2 space-x-1">
          {storyShapes.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentShape ? "bg-primary" : "bg-muted"
              }`}
              animate={{
                scale: index === currentShape ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Timeline milestone morphing
export const TimelineMilestoneMorph: React.FC<{
  className?: string;
  milestone: "education" | "first-job" | "growth" | "current";
  animate?: boolean;
}> = ({ className = "", milestone, animate = true }) => {
  const milestoneShapes = {
    education: {
      path: "M200 120 L170 120 L170 160 L230 160 L230 120 L200 120 M180 130 L220 130 M180 140 L220 140 M180 150 L220 150",
      fillColor: "hsl(var(--primary) / 0.2)",
      strokeColor: "hsl(var(--primary))",
    },
    "first-job": {
      path: "M180 120 L220 120 L220 160 L180 160 Z M185 125 L215 125 M185 135 L215 135 M185 145 L215 145 M185 155 L215 155",
      fillColor: "hsl(var(--secondary) / 0.2)",
      strokeColor: "hsl(var(--secondary))",
    },
    growth: {
      path: "M200 120 L215 135 L200 150 L185 135 Z M200 110 L220 140 L200 170 L180 140 Z",
      fillColor: "hsl(var(--accent) / 0.2)",
      strokeColor: "hsl(var(--accent))",
    },
    current: {
      path: "M200 140 m-30,0 a30,30 0 1,0 60,0 a30,30 0 1,0 -60,0 M170 140 L230 140 M200 110 L200 170",
      fillColor: "hsl(var(--primary) / 0.3)",
      strokeColor: "hsl(var(--primary))",
    },
  };

  const shape = milestoneShapes[milestone];

  return (
    <motion.svg
      width="80"
      height="80"
      viewBox="0 0 400 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={animate ? { scale: 0, rotate: -90 } : false}
      animate={animate ? { scale: 1, rotate: 0 } : false}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <motion.path
        d={shape.path}
        fill={shape.fillColor}
        stroke={shape.strokeColor}
        strokeWidth="3"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : false}
        transition={{ delay: 0.3, duration: 1.2 }}
      />
    </motion.svg>
  );
};
