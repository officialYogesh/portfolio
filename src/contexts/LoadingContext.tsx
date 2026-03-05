"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface LoadingContextType {
  isLoading: boolean;
  isHydrated: boolean;
  setLoading: (loading: boolean) => void;
  initializeApp: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Ensure proper hydration timing
    const hydrationTimer = setTimeout(() => {
      setIsHydrated(true);
      // Add additional delay for animations to ensure smooth rendering
      // Longer delay to prevent animation lags on first load
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
      }, 800);

      return () => clearTimeout(loadingTimer);
    }, 200);

    return () => clearTimeout(hydrationTimer);
  }, []);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const initializeApp = () => {
    setIsLoading(false);
  };

  const value: LoadingContextType = {
    isLoading,
    isHydrated,
    setLoading,
    initializeApp,
  };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};
