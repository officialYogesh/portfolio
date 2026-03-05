"use client";

import React, { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
  /** Element to render while the component is still mounting on the client */
  fallback?: React.ReactNode;
}

/**
 * ClientOnly renders its children only after the component has been mounted
 * on the client.  Useful to avoid hydration mismatches for browser-only APIs
 * or components that depend on window / document.
 */
export const ClientOnly: React.FC<ClientOnlyProps> = ({
  children,
  fallback = null,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <>{fallback}</>;

  return <>{children}</>;
};

export default ClientOnly;
