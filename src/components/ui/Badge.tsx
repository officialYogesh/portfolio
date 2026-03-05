"use client";

import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

export interface BadgeProps {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "outline"
    | "destructive"
    | "success"
    | "warning"
    | "info";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  removable?: boolean;
  onRemove?: () => void;
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const badgeVariants = {
  default: "bg-muted text-foreground border-border",
  primary: "bg-primary text-background border-primary",
  secondary: "bg-secondary text-background border-secondary",
  accent: "bg-accent text-background border-accent",
  outline: "bg-transparent text-foreground border-border border",
  destructive: "bg-destructive text-background border-destructive",
  success: "bg-green-500 text-white border-green-500",
  warning: "bg-warning text-background border-warning",
  info: "bg-info text-background border-info",
};

const badgeSizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
};

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  size = "md",
  icon,
  iconPosition = "left",
  removable = false,
  onRemove,
  interactive = false,
  className = "",
  children,
  onClick,
}) => {
  const badgeClasses = cn(
    // Base styles
    "inline-flex items-center justify-center",
    "font-medium rounded-full border transition-all duration-200",
    "select-none",

    // Variant styles
    badgeVariants[variant],

    // Size styles
    badgeSizes[size],

    // Interactive styles
    interactive || removable || onRemove || onClick ? "cursor-pointer" : "",

    className
  );

  const iconClasses = cn(
    "flex-shrink-0",
    iconPosition === "left" && (children || removable) ? "mr-1" : "",
    iconPosition === "right" && (children || removable) ? "ml-1" : ""
  );

  const RemoveIcon = () => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onRemove?.();
      }}
      className="ml-1 flex h-3 w-3 items-center justify-center rounded-full hover:bg-black/20 focus:outline-none"
      aria-label="Remove"
    >
      <svg className="h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
        <path d="M1.41 0L0 1.41l2.59 2.59L0 6.59 1.41 8l2.59-2.59L6.59 8 8 6.59 5.41 4 8 1.41 6.59 0z" />
      </svg>
    </button>
  );

  const badgeContent = (
    <>
      {icon && iconPosition === "left" && (
        <span className={iconClasses}>{icon}</span>
      )}

      {children}

      {icon && iconPosition === "right" && (
        <span className={iconClasses}>{icon}</span>
      )}

      {removable && <RemoveIcon />}
    </>
  );

  if (interactive || removable || onClick) {
    return (
      <motion.span
        className={badgeClasses}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
      >
        {badgeContent}
      </motion.span>
    );
  }

  return <span className={badgeClasses}>{badgeContent}</span>;
};

// Tech Stack Badge - Specialized badge for technology stack
export interface TechBadgeProps extends Omit<BadgeProps, "children"> {
  tech: string;
  category?: string;
  proficiency?: number; // 1-10 scale
  showProficiency?: boolean;
}

export const TechBadge: React.FC<TechBadgeProps> = ({
  tech,
  category,
  proficiency,
  showProficiency = false,
  variant = "outline",
  className = "",
  ...props
}) => {
  const getCategoryColor = (cat?: string) => {
    switch (cat) {
      case "frontend":
        return "border-blue-500 text-blue-700 bg-blue-50";
      case "backend":
        return "border-green-500 text-green-700 bg-green-50";
      case "database":
        return "border-purple-500 text-purple-700 bg-purple-50";
      case "tools":
        return "border-orange-500 text-orange-700 bg-orange-50";
      case "cloud":
        return "border-cyan-500 text-cyan-700 bg-cyan-50";
      case "testing":
        return "border-red-500 text-red-700 bg-red-50";
      case "mobile":
        return "border-pink-500 text-pink-700 bg-pink-50";
      default:
        return "";
    }
  };

  const categoryColorClass = category ? getCategoryColor(category) : "";

  return (
    <Badge
      variant={variant}
      className={cn(categoryColorClass, className)}
      interactive
      {...props}
    >
      <span className="flex items-center gap-1">
        {tech}
        {showProficiency && proficiency && (
          <span className="text-xs opacity-75">({proficiency}/10)</span>
        )}
      </span>
    </Badge>
  );
};

// Status Badge - For project status, etc.
export interface StatusBadgeProps
  extends Omit<BadgeProps, "children" | "variant"> {
  status: "completed" | "in-progress" | "planned" | "archived" | "draft";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = "",
  ...props
}) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          variant: "success" as const,
          text: "Completed",
          icon: "✓",
        };
      case "in-progress":
        return {
          variant: "warning" as const,
          text: "In Progress",
          icon: "⏳",
        };
      case "planned":
        return {
          variant: "info" as const,
          text: "Planned",
          icon: "📋",
        };
      case "archived":
        return {
          variant: "default" as const,
          text: "Archived",
          icon: "📦",
        };
      case "draft":
        return {
          variant: "outline" as const,
          text: "Draft",
          icon: "✏️",
        };
      default:
        return {
          variant: "default" as const,
          text: status,
          icon: "",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant} size="sm" className={className} {...props}>
      <span className="flex items-center gap-1">
        <span className="text-xs">{config.icon}</span>
        {config.text}
      </span>
    </Badge>
  );
};

export default Badge;
