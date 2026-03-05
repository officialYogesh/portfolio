"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

import { personalInfo } from "../../../config/personal-info";
import { getNavigationItems } from "../../../config/site-config";
import { SkipLink } from "../ui/SkipLink";
import { ThemeSelector } from "../ui/ThemeSelector";


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Get navigation items from centralized config
  const siteNavigation = getNavigationItems();
  const navigationItems = siteNavigation.map((item) => ({
    href: item.href,
    label: item.name,
    ariaLabel: `${item.description || `Go to ${item.name.toLowerCase()} page`}`,
  }));

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Animation variants
  const headerVariants = {
    initial: { y: -100 },
    animate: { y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  const logoVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { delay: 0.2, duration: 0.5 },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const mobileMenuItemVariants = {
    closed: {
      opacity: 0,
      x: -20,
    },
    open: {
      opacity: 1,
      x: 0,
    },
  };

  // Custom Hamburger Icon Component
  const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
    <div className="w-6 h-5 flex flex-col justify-between items-center">
      <motion.div
        className="w-full h-0.5 bg-primary origin-center"
        animate={
          isOpen
            ? { rotate: 45, y: 9, transition: { duration: 0.3 } }
            : { rotate: 0, y: 0, transition: { duration: 0.3 } }
        }
      />
      <motion.div
        className="w-full h-0.5 bg-primary"
        animate={
          isOpen
            ? { opacity: 0, transition: { duration: 0.2 } }
            : { opacity: 1, transition: { duration: 0.2, delay: 0.1 } }
        }
      />
      <motion.div
        className="w-full h-0.5 bg-primary origin-center"
        animate={
          isOpen
            ? { rotate: -45, y: -9, transition: { duration: 0.3 } }
            : { rotate: 0, y: 0, transition: { duration: 0.3 } }
        }
      />
    </div>
  );

  return (
    <>
      {/* Skip Link for Accessibility */}
      <SkipLink href="#main-content">Skip to main content</SkipLink>

      <motion.header
        {...headerVariants}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          "border-b border-border backdrop-blur supports-[backdrop-filter]:bg-card/80",
          isScrolled ? "bg-card/95 shadow-lg" : "bg-card/90"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo - Developer Style */}
            <motion.div {...logoVariants}>
              <Link
                href="/"
                className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg no-underline"
                aria-label={`${personalInfo.name} - ${personalInfo.title}`}
              >
                <motion.span
                  className="text-xl sm:text-2xl md:text-xl lg:text-2xl font-mono font-bold text-primary group-hover:text-accent transition-colors duration-300 no-underline"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  &lt;Yogesh /&gt;
                </motion.span>
              </Link>
            </motion.div>

            {/* Desktop Navigation - Hidden on mobile (sm), visible on tablet (md) and desktop (lg+) */}
            <nav
              className="hidden md:flex items-center md:space-x-1 lg:space-x-2"
              role="navigation"
              aria-label="Main navigation"
            >
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "relative rounded-lg font-medium transition-all duration-300 no-underline",
                      "px-3 py-2 md:px-3 md:py-2 lg:px-4", // Adjusted padding for different breakpoints
                      "text-sm md:text-base lg:text-base", // Adjusted text size for different breakpoints
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      "hover:bg-muted/20 hover:text-foreground",
                      isActiveRoute(item.href)
                        ? "text-primary bg-primary/10"
                        : "text-muted"
                    )}
                    aria-label={item.ariaLabel}
                    aria-current={isActiveRoute(item.href) ? "page" : undefined}
                  >
                    {item.label}
                    {isActiveRoute(item.href) && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary rounded-full"
                        layoutId="activeIndicator"
                        initial={false}
                        animate={{ x: "-50%" }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Right side: Theme Selector & Mobile Menu Button */}
            <div className="flex items-center space-x-2">
              {/* Theme Selector - visible on desktop/tablet, hidden on mobile */}
              <div className="hidden sm:block md:block">
                <ThemeSelector />
              </div>

              {/* Wrapper for Mobile menu button - visible ONLY on mobile phones (screens smaller than md: 768px) */}
              <div className="md:hidden">
                <motion.button
                  onClick={toggleMenu}
                  className={cn(
                    "mobile-menu-button flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg transition-all duration-200", // Standardized size
                    // Use theme-aware colors for better visibility
                    "bg-primary/10 text-primary border-2 border-primary/50 shadow-md",
                    "hover:bg-primary/20 hover:shadow-lg active:scale-95",
                    isMenuOpen && "bg-primary/25 shadow-lg scale-95"
                  )}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-navigation"
                  whileTap={{ scale: 0.9 }}
                >
                  <HamburgerIcon isOpen={isMenuOpen} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu - positioned below header, ONLY on mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden border-t border-border bg-card shadow-xl"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <nav
                id="mobile-navigation"
                className="container mx-auto px-4 py-6"
                role="navigation"
                aria-label="Mobile navigation"
              >
                {/* Theme Selector Section - ONLY in mobile menu */}
                <motion.div
                  variants={mobileMenuItemVariants}
                  className="mb-6 pb-4 border-b border-border"
                >
                  <div className="px-4 py-2">
                    <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">
                      Theme
                    </div>
                    <ThemeSelector />
                  </div>
                </motion.div>

                {/* Navigation Items */}
                <div className="space-y-1">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      variants={mobileMenuItemVariants}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "flex items-center px-4 py-4 rounded-lg font-medium transition-all duration-200 no-underline",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          "hover:bg-primary/10 hover:text-primary hover:translate-x-1",
                          isActiveRoute(item.href)
                            ? "text-primary bg-primary/10 border-l-4 border-primary font-semibold"
                            : "text-foreground"
                        )}
                        aria-label={item.ariaLabel}
                        aria-current={
                          isActiveRoute(item.href) ? "page" : undefined
                        }
                      >
                        <span className="text-lg">{item.label}</span>
                        {isActiveRoute(item.href) && (
                          <motion.div
                            className="ml-auto w-2 h-2 bg-primary rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu Backdrop - ONLY on mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-background/50 backdrop-blur-sm md:hidden z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
