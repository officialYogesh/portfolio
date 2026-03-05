"use client";

import React from "react";

import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "default" | "rounded" | "circular";
  animation?: "pulse" | "wave" | "none";
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  variant = "default",
  animation = "pulse",
  width,
  height,
  style,
  ...props
}) => {
  const skeletonClasses = cn(
    // Base styles
    "bg-muted animate-pulse",

    // Variant styles
    variant === "default" ? "rounded-md" : "",
    variant === "rounded" ? "rounded-lg" : "",
    variant === "circular" ? "rounded-full" : "",

    // Animation styles
    animation === "pulse" ? "animate-pulse" : "",
    animation === "wave" ? "animate-wave" : "",
    animation === "none" ? "animate-none" : "",

    className
  );

  const inlineStyles = {
    ...style,
    ...(width && { width: typeof width === "number" ? `${width}px` : width }),
    ...(height && {
      height: typeof height === "number" ? `${height}px` : height,
    }),
  };

  return (
    <div
      className={skeletonClasses}
      style={inlineStyles}
      aria-hidden="true"
      {...props}
    />
  );
};

// Text Skeleton - For text content
export interface TextSkeletonProps {
  lines?: number;
  className?: string;
  lineHeight?: "sm" | "md" | "lg";
  lastLineWidth?: string;
}

export const TextSkeleton: React.FC<TextSkeletonProps> = ({
  lines = 3,
  className = "",
  lineHeight = "md",
  lastLineWidth = "75%",
}) => {
  const lineHeights = {
    sm: "h-3",
    md: "h-4",
    lg: "h-5",
  };

  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn(
            lineHeights[lineHeight],
            "w-full",
            index === lines - 1 ? `w-[${lastLineWidth}]` : ""
          )}
        />
      ))}
    </div>
  );
};

// Card Skeleton - For card layouts
export interface CardSkeletonProps {
  className?: string;
  showImage?: boolean;
  showAvatar?: boolean;
  textLines?: number;
  showActions?: boolean;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  className = "",
  showImage = false,
  showAvatar = false,
  textLines = 3,
  showActions = false,
}) => (
  <div className={cn("p-4 border border-border rounded-lg bg-card", className)}>
    {showImage && <Skeleton className="w-full h-48 mb-4" />}

    <div className="space-y-3">
      {showAvatar && (
        <div className="flex items-center space-x-3">
          <Skeleton variant="circular" className="h-10 w-10" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <TextSkeleton lines={textLines} lineHeight="sm" />
      </div>

      {showActions && (
        <div className="flex space-x-2 pt-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      )}
    </div>
  </div>
);

// Project Card Skeleton - For project showcases
export const ProjectCardSkeleton: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <CardSkeleton className={className} showImage textLines={2} showActions />
);

// Profile Skeleton - For profile/bio sections
export interface ProfileSkeletonProps {
  className?: string;
  showLargeAvatar?: boolean;
}

export const ProfileSkeleton: React.FC<ProfileSkeletonProps> = ({
  className = "",
  showLargeAvatar = false,
}) => (
  <div className={cn("space-y-4", className)}>
    <div className="flex items-center space-x-4">
      <Skeleton
        variant="circular"
        className={cn(showLargeAvatar ? "h-24 w-24" : "h-16 w-16")}
      />
      <div className="space-y-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>

    <div className="space-y-3">
      <TextSkeleton lines={4} />
    </div>
  </div>
);

// List Skeleton - For lists and navigation
export interface ListSkeletonProps {
  items?: number;
  className?: string;
  showIcon?: boolean;
  showSubtext?: boolean;
}

export const ListSkeleton: React.FC<ListSkeletonProps> = ({
  items = 5,
  className = "",
  showIcon = false,
  showSubtext = false,
}) => (
  <div className={cn("space-y-3", className)}>
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="flex items-center space-x-3">
        {showIcon && <Skeleton variant="circular" className="h-6 w-6" />}
        <div className="flex-1 space-y-1">
          <Skeleton className="h-4 w-full" />
          {showSubtext && <Skeleton className="h-3 w-3/4" />}
        </div>
      </div>
    ))}
  </div>
);

// Table Skeleton - For table layouts
export interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
  showHeader?: boolean;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 4,
  className = "",
  showHeader = true,
}) => (
  <div className={cn("space-y-2", className)}>
    {showHeader && (
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-full" />
        ))}
      </div>
    )}

    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-8 w-full" />
          ))}
        </div>
      ))}
    </div>
  </div>
);

// Page Skeleton - For full page loading
export const PageSkeleton: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div className={cn("space-y-8 p-6", className)}>
    {/* Header */}
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
    </div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  </div>
);

export default Skeleton;
