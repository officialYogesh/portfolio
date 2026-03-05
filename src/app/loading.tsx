import React from "react";

import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" text="Loading..." />
        <p className="text-muted text-sm">
          Please wait while we prepare your content
        </p>
      </div>
    </div>
  );
}
