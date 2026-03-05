// Theme Configuration for Portfolio Website
// This file contains all 7 theme definitions with their color palettes

export interface ThemeColors {
  name: string;
  displayName: string;
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  border: string;
  card: string;
  destructive: string;
  warning: string;
  info: string;
}

export const themes: Record<string, ThemeColors> = {
  dracula: {
    name: "dracula",
    displayName: "Dracula",
    background: "#282a36",
    foreground: "#f8f8f2",
    primary: "#bd93f9",
    secondary: "#ff79c6",
    accent: "#50fa7b",
    muted: "#6272a4",
    border: "#6272a4",
    card: "#343746",
    destructive: "#ff5555",
    warning: "#f1fa8c",
    info: "#8be9fd",
  },
  "one-dark": {
    name: "one-dark",
    displayName: "One Dark",
    background: "#1e1e1e",
    foreground: "#e4e4e4",
    primary: "#61dafb",
    secondary: "#f78c6c",
    accent: "#98c379",
    muted: "#9ca3af",
    border: "#4e4e4e",
    card: "#2d2d2d",
    destructive: "#e06c75",
    warning: "#e5c07b",
    info: "#61dafb",
  },
  nord: {
    name: "nord",
    displayName: "Nord",
    background: "#2e3440",
    foreground: "#eceff4",
    primary: "#88c0d0",
    secondary: "#5e81ac",
    accent: "#a3be8c",
    muted: "#81a1c1",
    border: "#434c5e",
    card: "#434c5e",
    destructive: "#bf616a",
    warning: "#ebcb8b",
    info: "#81a1c1",
  },
  gruvbox: {
    name: "gruvbox",
    displayName: "Gruvbox",
    background: "#282828",
    foreground: "#fbf1c7",
    primary: "#d79921",
    secondary: "#cc241d",
    accent: "#98971a",
    muted: "#a89984",
    border: "#504945",
    card: "#3c3836",
    destructive: "#fb4934",
    warning: "#fabd2f",
    info: "#83a598",
  },
  "solarized-dark": {
    name: "solarized-dark",
    displayName: "Solarized Dark",
    background: "#002b36",
    foreground: "#fdf6e3",
    primary: "#268bd2",
    secondary: "#d33682",
    accent: "#859900",
    muted: "#839496",
    border: "#586e75",
    card: "#073642",
    destructive: "#dc322f",
    warning: "#b58900",
    info: "#2aa198",
  },
  horizon: {
    name: "horizon",
    displayName: "Horizon",
    background: "#1c1e26",
    foreground: "#e0e0e0",
    primary: "#e95678",
    secondary: "#fab795",
    accent: "#09f7a0",
    muted: "#9ca3af",
    border: "#464660",
    card: "#232530",
    destructive: "#f43e5c",
    warning: "#fac29a",
    info: "#26bbd9",
  },
  palenight: {
    name: "palenight",
    displayName: "Palenight",
    background: "#292d3e",
    foreground: "#bfc7d5",
    primary: "#c792ea",
    secondary: "#f78c6c",
    accent: "#c3e88d",
    muted: "#959dcb",
    border: "#676e95",
    card: "#343a55",
    destructive: "#f07178",
    warning: "#ffcb6b",
    info: "#89ddff",
  },
};

export const defaultTheme = "dracula";

export const themeList = Object.keys(themes);

export function getTheme(themeName: string): ThemeColors {
  return themes[themeName] || themes[defaultTheme];
}

export function applyTheme(themeName: string): void {
  if (typeof document === "undefined") return;

  const theme = getTheme(themeName);
  const root = document.documentElement;

  // Add transition class for smooth animation
  root.classList.add("theme-transitioning");

  // Apply theme to data attribute
  root.setAttribute("data-theme", theme.name);

  // Store in localStorage
  localStorage.setItem("portfolio-theme", theme.name);

  // Remove transition class after animation completes
  setTimeout(() => {
    root.classList.remove("theme-transitioning");
  }, 300); // Match the CSS transition duration
}

export function getStoredTheme(): string {
  if (typeof localStorage === "undefined") return defaultTheme;
  return localStorage.getItem("portfolio-theme") || defaultTheme;
}

export function initializeTheme(): void {
  if (typeof document === "undefined") return;

  const storedTheme = getStoredTheme();
  applyTheme(storedTheme);
}

// Theme metadata for UI components
export const themeDescriptions: Record<string, string> = {
  dracula: "Dark purple theme with vibrant colors",
  "one-dark": "Deep dark theme with high contrast",
  nord: "Cool blue-based arctic theme",
  gruvbox: "Warm earth-tone theme",
  "solarized-dark": "Balanced dark theme",
  horizon: "Modern dark theme with vivid highlights",
  palenight: "Dark theme with purple accents",
};

export type ThemeName = keyof typeof themes;

export function getSystemPreference(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";

  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch (error) {
    console.warn("Could not detect system color preference:", error);
    return "dark";
  }
}

export function getThemeForSystemPreference(): string {
  // const preference = getSystemPreference();
  // All our themes are dark themes, so we'll always return dracula for now
  // In the future, we could add light theme variants
  return defaultTheme;
}

export function initializeThemeWithSystemPreference(): string {
  if (typeof localStorage === "undefined") return defaultTheme;

  const storedTheme = localStorage.getItem("portfolio-theme");

  if (storedTheme && themes[storedTheme]) {
    return storedTheme;
  }

  // If no stored theme, use system preference
  return getThemeForSystemPreference();
}

export function setupSystemPreferenceListener(
  callback: (theme: string) => void
): () => void {
  if (typeof window === "undefined") return () => {};

  try {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      // Only auto-switch if user hasn't manually selected a theme
      const hasStoredTheme = localStorage.getItem("portfolio-theme");
      if (!hasStoredTheme) {
        const newTheme = getThemeForSystemPreference();
        callback(newTheme);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    // Return cleanup function
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  } catch (error) {
    console.warn("Could not set up system preference listener:", error);
    return () => {};
  }
}
