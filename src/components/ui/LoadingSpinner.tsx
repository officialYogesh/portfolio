import { Loader2 } from "lucide-react";
import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "muted" | "accent";
  className?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  variant = "primary",
  className = "",
  text,
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const colorClasses = {
    primary: "text-primary",
    muted: "text-muted",
    accent: "text-accent",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Loader2
        className={`animate-spin ${sizeClasses[size]} ${colorClasses[variant]}`}
      />
      {text && (
        <span
          className={`${colorClasses[variant]} ${textSizeClasses[size]} font-medium`}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;
