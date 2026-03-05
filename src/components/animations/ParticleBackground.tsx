"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

import { useReducedMotion } from "../../lib/animations/hooks";
import { cn } from "../../lib/utils";

export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

export interface ParticleBackgroundProps {
  particleCount?: number;
  particleColor?: string;
  particleSize?: { min: number; max: number };
  particleSpeed?: { min: number; max: number };
  particleLife?: { min: number; max: number };
  enableMouse?: boolean;
  mouseInfluence?: number;
  enableConnections?: boolean;
  connectionDistance?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Canvas-based particle background component with physics and interactions
 */
export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleCount = 50,
  particleColor = "rgba(255, 255, 255, 0.5)",
  particleSize = { min: 1, max: 3 },
  particleSpeed = { min: 0.5, max: 2 },
  particleLife = { min: 3000, max: 6000 },
  enableMouse = true,
  mouseInfluence = 100,
  enableConnections = true,
  connectionDistance = 100,
  className = "",
  style = {},
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [isVisible, setIsVisible] = useState(false);
  const { prefersReducedMotion } = useReducedMotion();

  // Create a new particle
  const createParticle = useCallback((): Particle => {
    const canvas = canvasRef.current;
    if (!canvas) return {} as Particle;

    const life =
      Math.random() * (particleLife.max - particleLife.min) + particleLife.min;

    return {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx:
        (Math.random() - 0.5) * (particleSpeed.max - particleSpeed.min) +
        particleSpeed.min,
      vy:
        (Math.random() - 0.5) * (particleSpeed.max - particleSpeed.min) +
        particleSpeed.min,
      size:
        Math.random() * (particleSize.max - particleSize.min) +
        particleSize.min,
      opacity: Math.random() * 0.5 + 0.1,
      color: particleColor,
      life,
      maxLife: life,
    };
  }, [particleLife, particleSpeed, particleSize, particleColor]);

  // Initialize particles
  const initParticles = useCallback(() => {
    particlesRef.current = Array.from(
      { length: particleCount },
      createParticle
    );
  }, [particleCount, createParticle]);

  // Update particle physics
  const updateParticle = useCallback(
    (particle: Particle, deltaTime: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return particle;

      // Update position
      particle.x += particle.vx * deltaTime;
      particle.y += particle.vy * deltaTime;

      // Mouse influence
      if (enableMouse) {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseInfluence) {
          const force = (mouseInfluence - distance) / mouseInfluence;
          particle.vx += (dx / distance) * force * 0.1;
          particle.vy += (dy / distance) * force * 0.1;
        }
      }

      // Boundary wrapping
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      // Update life
      particle.life -= deltaTime;
      particle.opacity = Math.max(0, particle.life / particle.maxLife) * 0.5;

      return particle;
    },
    [enableMouse, mouseInfluence]
  );

  // Draw particles and connections
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;

    // Draw connections
    if (enableConnections) {
      ctx.strokeStyle = particleColor;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.2;
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // Draw particles
    particles.forEach((particle) => {
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;
  }, [enableConnections, connectionDistance, particleColor]);

  // Animation loop
  const animate = useCallback(() => {
    if (!isVisible || prefersReducedMotion) return;

    const deltaTime = 16; // ~60fps

    // Update particles
    particlesRef.current = particlesRef.current
      .map((particle) => updateParticle(particle, deltaTime))
      .filter((particle) => particle.life > 0);

    // Replace dead particles
    while (particlesRef.current.length < particleCount) {
      particlesRef.current.push(createParticle());
    }

    draw();
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [
    isVisible,
    prefersReducedMotion,
    updateParticle,
    particleCount,
    createParticle,
    draw,
  ]);

  // Handle mouse movement
  const handleMouseMove = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }, []);

  // Handle canvas resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }
  }, []);

  // Initialize and cleanup
  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set up canvas
    handleResize();
    initParticles();
    setIsVisible(true);

    // Event listeners
    window.addEventListener("resize", handleResize);
    if (enableMouse) {
      canvas.addEventListener("mousemove", handleMouseMove);
    }

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (enableMouse) {
        canvas.removeEventListener("mousemove", handleMouseMove);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    prefersReducedMotion,
    handleResize,
    initParticles,
    enableMouse,
    handleMouseMove,
    animate,
  ]);

  if (prefersReducedMotion) {
    return (
      <div className={cn("relative", className)} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn("relative", className)} style={style}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: -1 }}
      />
      {children}
    </div>
  );
};

/**
 * Pre-built floating dots background
 */
export const FloatingDots: React.FC<{
  density?: "low" | "medium" | "high";
  color?: string;
  className?: string;
  children?: React.ReactNode;
}> = ({
  density = "medium",
  color = "rgba(255, 255, 255, 0.3)",
  className = "",
  children,
}) => {
  const densitySettings = {
    low: 20,
    medium: 50,
    high: 100,
  };

  return (
    <ParticleBackground
      particleCount={densitySettings[density]}
      particleColor={color}
      particleSize={{ min: 1, max: 2 }}
      particleSpeed={{ min: 0.2, max: 0.8 }}
      enableConnections={false}
      enableMouse={false}
      className={className}
    >
      {children}
    </ParticleBackground>
  );
};

/**
 * Interactive network background with connections
 */
export const NetworkBackground: React.FC<{
  nodeCount?: number;
  nodeColor?: string;
  className?: string;
  children?: React.ReactNode;
}> = ({
  nodeCount = 30,
  nodeColor = "rgba(59, 130, 246, 0.6)",
  className = "",
  children,
}) => (
  <ParticleBackground
    particleCount={nodeCount}
    particleColor={nodeColor}
    particleSize={{ min: 2, max: 4 }}
    particleSpeed={{ min: 0.3, max: 1 }}
    enableConnections={true}
    connectionDistance={120}
    enableMouse={true}
    mouseInfluence={150}
    className={className}
  >
    {children}
  </ParticleBackground>
);

export default ParticleBackground;
