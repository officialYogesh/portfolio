"use client";

import { useEffect } from "react";

export const RoutePrefetcher: React.FC = () => {
  useEffect(() => {
    // Preload critical routes for faster navigation
    const routes = ["/about", "/projects", "/resume", "/contact"];

    routes.forEach((route) => {
      // Create prefetch link
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = route;
      link.as = "document";
      document.head.appendChild(link);
    });

    // Cleanup function
    return () => {
      // Remove prefetch links on unmount (cleanup)
      const prefetchLinks = document.querySelectorAll('link[rel="prefetch"]');
      prefetchLinks.forEach((link) => {
        if (routes.includes(link.getAttribute("href") || "")) {
          link.remove();
        }
      });
    };
  }, []);

  return null; // This component doesn't render anything
};

export default RoutePrefetcher;
