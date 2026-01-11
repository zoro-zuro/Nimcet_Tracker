"use client";

import { ConvexReactClient } from "convex/react";
import { ConvexProvider } from "convex/react";

// Create Convex client only if URL is available
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  // For Task 1/4, we don't need actual Convex connection for the health check
  // This will be properly configured when Convex deployment is set up
  if (!convex) {
    // Return children directly if no Convex URL is configured
    return <>{children}</>;
  }
  
  return (
    <ConvexProvider client={convex}>
      {children}
    </ConvexProvider>
  );
}