"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";

export interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  variant?: "default" | "elevated" | "outlined" | "ghost";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  hover?: boolean;
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}

const cardVariants = {
  default: "bg-card border border-border",
  elevated: "bg-card shadow-lg border border-border",
  outlined: "bg-transparent border-2 border-border",
  ghost: "bg-transparent",
};

const cardPadding = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
};

const cardRounded = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const cardAnimations = {
  hover: {
    whileHover: {
      y: -4,
      scale: 1.02,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
    transition: { duration: 0.2, ease: "easeOut" },
  },
  interactive: {
    whileHover: { scale: 1.01 },
    whileTap: { scale: 0.99 },
    transition: { duration: 0.15, ease: "easeInOut" },
  },
};

export const Card: React.FC<CardProps> = ({
  variant = "default",
  padding = "md",
  rounded = "lg",
  hover = false,
  interactive = false,
  className = "",
  children,
  ...props
}) => {
  const cardClasses = cn(
    // Base styles
    "transition-all duration-200",

    // Variant styles
    cardVariants[variant],

    // Padding styles
    cardPadding[padding],

    // Rounded styles
    cardRounded[rounded],

    // Interactive styles
    interactive && "cursor-pointer",

    className
  );

  const animations = hover
    ? cardAnimations.hover
    : interactive
    ? cardAnimations.interactive
    : {};

  return (
    <motion.div className={cardClasses} {...animations} {...props}>
      {children}
    </motion.div>
  );
};

// Card sub-components
export interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  className = "",
  children,
}) => (
  <div className={cn("flex flex-col space-y-1.5 pb-4", className)}>
    {children}
  </div>
);

export interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const CardTitle: React.FC<CardTitleProps> = ({
  className = "",
  children,
  as: Component = "h3",
}) => (
  <Component
    className={cn(
      "card-title font-semibold leading-none tracking-tight",
      className
    )}
  >
    {children}
  </Component>
);

export interface CardDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({
  className = "",
  children,
}) => <p className={cn("card-text-muted text-sm", className)}>{children}</p>;

export interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({
  className = "",
  children,
}) => <div className={cn("pt-0", className)}>{children}</div>;

export interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  className = "",
  children,
}) => <div className={cn("flex items-center pt-4", className)}>{children}</div>;

// Project Card - Specialized card for project showcases
export interface ProjectCardProps extends Omit<CardProps, "children"> {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  href?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags = [],
  href,
  className = "",
  ...props
}) => (
  <Card
    variant="elevated"
    hover
    interactive={!!href}
    className={cn("overflow-hidden", className)}
    {...props}
  >
    {image && (
      <div className="aspect-video w-full overflow-hidden relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
    )}

    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>

    {tags.length > 0 && (
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    )}
  </Card>
);

export default Card;
