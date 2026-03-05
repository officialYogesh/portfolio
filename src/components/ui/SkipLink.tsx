"use client";

import { motion } from "framer-motion";
import React from "react";

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const SkipLink: React.FC<SkipLinkProps> = ({
  href,
  children,
  className = "",
}) => {
  return (
    <motion.a
      href={href}
      className={`
        sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
        focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg
        focus:bg-primary focus:text-background focus:font-medium
        focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2
        focus:ring-background ${className}
      `}
      initial={{ opacity: 0, y: -10 }}
      whileFocus={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.a>
  );
};

export default SkipLink;
