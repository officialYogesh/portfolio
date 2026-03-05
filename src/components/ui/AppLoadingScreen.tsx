"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

import { useLoading } from "@/contexts/LoadingContext";
import { useReducedMotion } from "@/lib/animations/hooks";

import CircularLoadingSpinner from "./CircularLoadingSpinner";

export const AppLoadingScreen: React.FC = () => {
  const { isLoading } = useLoading();
  const { prefersReducedMotion } = useReducedMotion();
  const [progress, setProgress] = useState(0);

  // Simulate loading progress for better UX
  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 15;
        });
      }, 150);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
    }
  }, [isLoading]);

  // Don't show loading screen if we prefer reduced motion
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              transition: {
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
            className="text-center space-y-6"
          >
            <div className="relative flex items-center justify-center">
              <CircularLoadingSpinner
                size="xl"
                color="primary"
                showProgress={true}
                progress={progress}
                className="text-primary"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.2,
                  duration: 0.3,
                },
              }}
              className="space-y-2"
            >
              <h2 className="text-xl font-semibold text-foreground">
                Loading Portfolio
              </h2>
              <p className="text-sm text-muted-foreground">
                {progress < 100 ? `${Math.round(progress)}%` : "Ready!"}
              </p>
            </motion.div>

            {/* Progress indicator */}
            <motion.div
              className="w-32 h-1 bg-muted rounded-full overflow-hidden mx-auto"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.4 },
              }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ width: "0%" }}
                animate={{
                  width: "100%",
                  transition: {
                    duration: 2,
                    ease: [0.4, 0, 0.2, 1],
                  },
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
