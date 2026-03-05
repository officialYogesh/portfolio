"use client";

import { motion } from "framer-motion";
import React, { forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  variant?: "default" | "filled" | "outlined";
  inputSize?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  className?: string;
  containerClassName?: string;
}

const inputVariants = {
  default: "border border-border bg-background",
  filled: "border-0 bg-muted",
  outlined: "border-2 border-border bg-transparent",
};

const inputSizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-base",
  lg: "px-5 py-4 text-lg",
};

const inputStates = {
  default: "focus:ring-2 focus:ring-primary focus:border-primary",
  error:
    "border-destructive focus:ring-2 focus:ring-destructive focus:border-destructive",
  success:
    "border-green-500 focus:ring-2 focus:ring-green-500 focus:border-green-500",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      description,
      error,
      success,
      variant = "default",
      inputSize = "md",
      icon,
      iconPosition = "left",
      loading = false,
      className = "",
      containerClassName = "",
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const hasSuccess = !!success && !hasError;
    const hasIcon = !!icon;

    const inputClasses = cn(
      // Base styles
      "w-full rounded-lg transition-all duration-200",
      "placeholder:text-muted-foreground",
      "focus:outline-none",
      "disabled:opacity-50 disabled:cursor-not-allowed",

      // Variant styles
      inputVariants[variant],

      // Size styles
      inputSizes[inputSize],

      // State styles
      hasError
        ? inputStates.error
        : hasSuccess
        ? inputStates.success
        : inputStates.default,

      // Icon padding
      hasIcon && iconPosition === "left" ? "pl-10" : "",
      hasIcon && iconPosition === "right" ? "pr-10" : "",

      className
    );

    const iconClasses = cn(
      "absolute top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none",
      iconPosition === "left" ? "left-3" : "right-3",
      inputSize === "sm"
        ? "w-4 h-4"
        : inputSize === "lg"
        ? "w-6 h-6"
        : "w-5 h-5"
    );

    const LoadingSpinner = () => (
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      </div>
    );

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            aria-invalid={hasError}
            aria-describedby={
              description || error || success
                ? `${inputId}-description`
                : undefined
            }
            {...props}
          />

          {/* Icon */}
          {icon && !loading && <div className={iconClasses}>{icon}</div>}

          {/* Loading Spinner */}
          {loading && <LoadingSpinner />}
        </div>

        {/* Description/Error/Success */}
        {(description || error || success) && (
          <motion.div
            id={`${inputId}-description`}
            className={cn(
              "text-sm",
              hasError
                ? "text-destructive"
                : hasSuccess
                ? "text-green-600"
                : "text-muted-foreground"
            )}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error || success || description}
          </motion.div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// Textarea Component
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  variant?: "default" | "filled" | "outlined";
  inputSize?: "sm" | "md" | "lg";
  resize?: "none" | "vertical" | "horizontal" | "both";
  className?: string;
  containerClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      description,
      error,
      success,
      variant = "default",
      inputSize = "md",
      resize = "vertical",
      className = "",
      containerClassName = "",
      id,
      ...props
    },
    ref
  ) => {
    const textareaId =
      id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const hasSuccess = !!success && !hasError;

    const textareaClasses = cn(
      // Base styles
      "w-full rounded-lg transition-all duration-200",
      "placeholder:text-muted-foreground",
      "focus:outline-none",
      "disabled:opacity-50 disabled:cursor-not-allowed",

      // Variant styles
      inputVariants[variant],

      // Size styles
      inputSizes[inputSize],

      // State styles
      hasError
        ? inputStates.error
        : hasSuccess
        ? inputStates.success
        : inputStates.default,

      // Resize
      resize === "none" ? "resize-none" : "",
      resize === "vertical" ? "resize-y" : "",
      resize === "horizontal" ? "resize-x" : "",
      resize === "both" ? "resize" : "",

      className
    );

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          id={textareaId}
          className={textareaClasses}
          aria-invalid={hasError}
          aria-describedby={
            description || error || success
              ? `${textareaId}-description`
              : undefined
          }
          {...props}
        />

        {/* Description/Error/Success */}
        {(description || error || success) && (
          <motion.div
            id={`${textareaId}-description`}
            className={cn(
              "text-sm",
              hasError
                ? "text-destructive"
                : hasSuccess
                ? "text-green-600"
                : "text-muted-foreground"
            )}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error || success || description}
          </motion.div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

// Select Component
export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  variant?: "default" | "filled" | "outlined";
  inputSize?: "sm" | "md" | "lg";
  placeholder?: string;
  options: { value: string; label: string; disabled?: boolean }[];
  className?: string;
  containerClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      description,
      error,
      success,
      variant = "default",
      inputSize = "md",
      placeholder,
      options,
      className = "",
      containerClassName = "",
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const hasSuccess = !!success && !hasError;

    const selectClasses = cn(
      // Base styles
      "w-full rounded-lg transition-all duration-200",
      "focus:outline-none appearance-none",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "bg-no-repeat bg-right bg-[length:16px_16px]",
      "pr-10", // Space for dropdown arrow

      // Variant styles
      inputVariants[variant],

      // Size styles
      inputSizes[inputSize],

      // State styles
      hasError
        ? inputStates.error
        : hasSuccess
        ? inputStates.success
        : inputStates.default,

      className
    );

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}

        {/* Select Container */}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={selectClasses}
            aria-invalid={hasError}
            aria-describedby={
              description || error || success
                ? `${selectId}-description`
                : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Dropdown Arrow */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Description/Error/Success */}
        {(description || error || success) && (
          <motion.div
            id={`${selectId}-description`}
            className={cn(
              "text-sm",
              hasError
                ? "text-destructive"
                : hasSuccess
                ? "text-green-600"
                : "text-muted-foreground"
            )}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error || success || description}
          </motion.div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Input;
