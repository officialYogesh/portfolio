"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

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
                Something went wrong
              </h1>

              <p className="text-muted mb-6">
                An unexpected error occurred. We apologize for the
                inconvenience.
              </p>

              <div className="space-y-4">
                <button
                  onClick={this.handleReset}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors duration-200"
                >
                  <RefreshCw size={16} />
                  Try Again
                </button>

                <button
                  onClick={() => window.location.reload()}
                  className="w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted/20 transition-colors duration-200"
                >
                  Reload Page
                </button>
              </div>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm font-medium text-muted mb-2">
                    Error Details (Development Only)
                  </summary>
                  <div className="text-xs bg-card border border-border rounded p-3 overflow-auto">
                    <pre className="text-destructive">
                      {this.state.error.toString()}
                    </pre>
                    {this.state.errorInfo?.componentStack && (
                      <pre className="mt-2 text-muted">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
