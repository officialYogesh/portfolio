"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { SocialIcon } from "react-social-icons";

import { PrimaryCTA, SecondaryCTA } from "@/components/ui/CTAButton";
import { cn } from "@/lib/utils";

import { getCTA } from "../../../config/content-config";
import { personalInfo } from "../../../config/personal-info";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className={cn(
        "relative w-full mt-auto border-t border-border/20",
        "bg-background text-foreground"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-8 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-8 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-1 bg-gradient-to-r from-primary/5 via-accent/10 to-secondary/5 blur-sm" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Call to Action Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Desktop/iPad: Improved Layout, Mobile: Centered */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 xl:gap-12">
              {/* Left Side: Headlines with subtle visual enhancement */}
              <div className="text-center lg:text-left lg:flex-1 lg:pr-8">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight">
                  Ready to build something{" "}
                  <span className="text-primary relative">
                    amazing
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </span>
                  ?
                </h2>
                <p className="text-muted text-lg sm:text-xl lg:text-xl xl:text-2xl mb-8 lg:mb-6 leading-relaxed max-w-2xl lg:max-w-none">
                  Let&apos;s turn your ideas into reality. I&apos;m always
                  excited to work on new projects and collaborate with amazing
                  teams.
                </p>

                {/* Desktop-only tagline */}
                <div className="hidden lg:block">
                  <p className="text-muted/80 text-base italic">
                    &ldquo;Innovation distinguishes between a leader and a
                    follower.&rdquo;
                  </p>
                </div>
              </div>

              {/* Visual Connector - Desktop only */}
              <div className="hidden lg:block lg:flex-shrink-0">
                <div className="w-px h-32 bg-gradient-to-b from-transparent via-border to-transparent" />
              </div>

              {/* Right Side: Actions with improved spacing */}
              <div className="lg:flex-shrink-0 lg:w-auto xl:w-auto min-w-[320px]">
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row lg:flex-row items-center justify-center lg:justify-start gap-4 mb-8 mt-8 lg:mt-0">
                  <PrimaryCTA
                    href="/contact"
                    icon={<Mail className="h-5 w-5" />}
                    rightIcon={<ArrowUpRight className="h-5 w-5" />}
                    fullWidth
                    className="sm:w-auto lg:w-auto"
                  >
                    {getCTA("primary", "getInTouch")}
                  </PrimaryCTA>

                  <SecondaryCTA
                    href={personalInfo.resumeFile.path}
                    rightIcon={<ArrowUpRight className="h-5 w-5" />}
                    fullWidth
                    className="sm:w-auto lg:w-auto"
                  >
                    View {personalInfo.resumeFile.displayName}
                  </SecondaryCTA>
                </div>

                {/* Social Links with enhanced styling */}
                <motion.div
                  className="flex items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <span className="text-muted text-sm font-medium hidden lg:block">
                    Connect:
                  </span>
                  {personalInfo.socialLinks
                    .filter(
                      (social) => social.platform.toLowerCase() !== "portfolio"
                    )
                    .map((social, index) => (
                      <motion.div
                        key={social.platform}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="group"
                      >
                        <SocialIcon
                          url={social.url}
                          target={
                            social.platform.toLowerCase() === "email"
                              ? undefined
                              : "_blank"
                          }
                          rel={
                            social.platform.toLowerCase() === "email"
                              ? undefined
                              : "noopener noreferrer"
                          }
                          style={{ height: 48, width: 48 }}
                          bgColor="transparent"
                          fgColor="currentColor"
                          className="text-muted hover:text-primary transition-all duration-300 border border-border/30 hover:border-primary/50 rounded-full hover:shadow-lg hover:shadow-primary/10"
                          aria-label={`Connect on ${social.platform}`}
                        />
                      </motion.div>
                    ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Divider */}
          <div className="relative mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary/20 rounded-full blur-sm" />
          </div>

          {/* Bottom Section */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Copyright with enhanced heart */}
            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              <span>
                © {currentYear} {personalInfo.name}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                Made with
                <motion.span
                  className="inline-flex items-center"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                    repeatDelay: 3,
                  }}
                >
                  <AiFillHeart
                    className="w-4 h-4"
                    style={{ color: "#ef4444" }}
                  />
                </motion.span>
                in {personalInfo.location}
              </span>
            </div>

            {/* Footer Links */}
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors duration-200 relative group"
              >
                Privacy
                <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-200 group-hover:w-full" />
              </Link>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors duration-200 relative group"
              >
                Terms
                <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-200 group-hover:w-full" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
