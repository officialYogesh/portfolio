"use client";

import { ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

import { themeDescriptions } from "../../../config/themes";
import { useTheme } from "../../contexts/ThemeContext";

export const ThemeSelector: React.FC = () => {
  const { currentTheme, setTheme, themes, isLoading } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle escape key to close dropdown
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Add a small delay to prevent immediate closing when opening
      const timer = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
      }, 0);

      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleThemeChange = (themeId: string) => {
    if (themeId in themes) {
      setTheme(themeId as keyof typeof themes);
    }
    setIsOpen(false);
  };

  const currentThemeData = themes[currentTheme];

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 text-sm">
        <div className="w-4 h-4 rounded-full bg-muted animate-pulse" />
        <span className="text-muted">Loading...</span>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-foreground hover:text-primary bg-card border border-border rounded-lg hover:bg-muted/20 transition-all duration-200 min-w-[140px]"
        aria-label="Select theme"
        aria-expanded={isOpen}
      >
        <span className="text-muted text-xs font-medium">Theme:</span>
        <div className="flex items-center space-x-2 flex-1">
          <div
            className="w-3 h-3 rounded-full border border-border flex-shrink-0"
            style={{ backgroundColor: currentThemeData?.primary || "#bd93f9" }}
          />
          <span className="text-foreground font-medium truncate">
            {currentThemeData?.displayName || "Dracula"}
          </span>
        </div>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 text-muted flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-[9999] animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
          <div className="p-2">
            <div className="text-xs font-semibold text-muted uppercase tracking-wide px-2 py-1 mb-2">
              Choose Theme
            </div>
            {Object.entries(themes).map(([themeId, theme]) => (
              <button
                key={themeId}
                onClick={() => handleThemeChange(themeId)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                  currentTheme === themeId
                    ? "bg-primary/20 text-primary scale-[1.02]"
                    : "text-foreground hover:bg-muted/30 hover:scale-[1.01]"
                }`}
              >
                <div
                  className="w-4 h-4 rounded-full border border-border transition-transform duration-200 flex-shrink-0"
                  style={{ backgroundColor: theme.primary }}
                />
                <div className="flex-1 text-left">
                  <div className="font-medium">{theme.displayName}</div>
                  <div className="text-xs text-muted">
                    {themeDescriptions[themeId]}
                  </div>
                </div>
                {currentTheme === themeId && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
