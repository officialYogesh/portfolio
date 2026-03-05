"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  themes,
  applyTheme,
  defaultTheme,
  initializeThemeWithSystemPreference,
  setupSystemPreferenceListener,
  type ThemeName,
} from "../../config/themes";

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themes: typeof themes;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(defaultTheme);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize theme on mount - skip initial apply since it's done in HTML
    const initializeTheme = () => {
      try {
        const initialTheme = initializeThemeWithSystemPreference();
        setCurrentTheme(initialTheme as ThemeName);
        // Don't apply theme here - it's already applied in the blocking script
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing theme:", error);
        // Fallback to default theme
        setCurrentTheme(defaultTheme);
        setIsLoading(false);
      }
    };

    initializeTheme();

    // Set up system preference listener
    const cleanup = setupSystemPreferenceListener((newTheme: string) => {
      setCurrentTheme(newTheme as ThemeName);
      applyTheme(newTheme);
    });

    return cleanup;
  }, []);

  const setTheme = (theme: ThemeName) => {
    try {
      setCurrentTheme(theme);
      applyTheme(theme);
    } catch (error) {
      console.error("Error setting theme:", error);
    }
  };

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    themes,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export default ThemeContext;
