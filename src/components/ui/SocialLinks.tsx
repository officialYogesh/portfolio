"use client";

import { Mail, Linkedin, Github, Globe } from "lucide-react";
import React from "react";

import { type SocialLink } from "../../../config/personal-info";

// Map supported platform names to Lucide icons
const iconMap = {
  github: Github,
  linkedin: Linkedin,
  portfolio: Globe,
  email: Mail,
} as const;

export const getSocialIcon = (platform: string) => {
  const key = platform.toLowerCase() as keyof typeof iconMap;
  return iconMap[key] ?? Globe;
};

interface SocialLinksProps {
  links: SocialLink[];
  /** Size of the icon in pixels – default 18 */
  iconSize?: number;
  /** Additional class names for the container */
  className?: string;
}

/**
 * Renders a list of social links with the appropriate icon for each platform.
 * Keeps the icon-mapping logic in one place so pages/components can stay lean.
 */
export const SocialLinks: React.FC<SocialLinksProps> = ({
  links,
  iconSize = 18,
  className = "",
}) => {
  return (
    <div className={`flex gap-4 ${className}`.trim()}>
      {links.map((link) => {
        const Icon = getSocialIcon(link.platform);
        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.platform}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon size={iconSize} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
