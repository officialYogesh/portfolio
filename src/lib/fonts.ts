import { Inter, JetBrains_Mono } from "next/font/google";

// Inter font for headings - optimized with Next.js
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

// JetBrains Mono for code elements - optimized with Next.js
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
});

// System font stack for body text (no Google Font needed)
// This will be defined in CSS as a fallback system font stack
export const systemFonts = {
  sans: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
  ].join(", "),
  mono: [
    '"SFMono-Regular"',
    "Consolas",
    '"Liberation Mono"',
    "Menlo",
    "Monaco",
    '"Courier New"',
    "monospace",
  ].join(", "),
};
