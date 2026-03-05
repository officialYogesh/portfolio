// Base UI Components
export { Badge, type BadgeProps } from "./Badge";
export {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./Card";

// Layout Components
// ButtonGroup not implemented yet

// CTA Components (New)
export {
  CTAButton,
  PrimaryCTA,
  SecondaryCTA,
  type CTAButtonProps,
} from "./CTAButton";

export { CardFooter, ProjectCard } from "./Card";
export type { CardFooterProps, ProjectCardProps } from "./Card";

export { TechBadge, StatusBadge } from "./Badge";
export type { TechBadgeProps, StatusBadgeProps } from "./Badge";

export {
  Skeleton,
  TextSkeleton,
  CardSkeleton,
  ProjectCardSkeleton,
  ProfileSkeleton,
  ListSkeleton,
  TableSkeleton,
  PageSkeleton,
} from "./Skeleton";
export type {
  SkeletonProps,
  TextSkeletonProps,
  CardSkeletonProps,
  ProfileSkeletonProps,
  ListSkeletonProps,
  TableSkeletonProps,
} from "./Skeleton";

export { Modal, Lightbox, ConfirmationModal } from "./Modal";
export type {
  ModalProps,
  LightboxProps,
  ConfirmationModalProps,
} from "./Modal";

export { Input, Textarea, Select } from "./Input";
export type { InputProps, TextareaProps, SelectProps } from "./Input";

// Existing components (default exports)
export { default as LoadingSpinner } from "./LoadingSpinner";

export { default as ErrorBoundary } from "./ErrorBoundary";

export { SkipLink } from "./SkipLink";

export { ThemeSelector } from "./ThemeSelector";

// Bubble UI Components

// Social Links
export { SocialLinks, getSocialIcon } from "./SocialLinks";
