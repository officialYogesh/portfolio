"use client";

import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-destructive/20 rounded-full">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">
            Oops! Something went wrong
          </h1>

          <p className="text-muted mb-6">
            We encountered an unexpected error. Please try again or go back to
            the home page.
          </p>

          <div className="space-y-3">
            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              <RefreshCw size={16} />
              Try Again
            </button>

            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted/20 transition-colors duration-200"
            >
              <Home size={16} />
              Go Home
            </Link>
          </div>

          {process.env.NODE_ENV === "development" && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm font-medium text-muted mb-2">
                Error Details (Development Only)
              </summary>
              <div className="text-xs bg-card border border-border rounded p-3 overflow-auto">
                <pre className="text-destructive whitespace-pre-wrap">
                  {error.message}
                </pre>
                {error.digest && (
                  <p className="mt-2 text-muted">Error ID: {error.digest}</p>
                )}
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
