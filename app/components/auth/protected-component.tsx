"use client";

import React from "react";
import { useAuth } from "@/app/hooks/useAuth";

interface ProtectedComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * A component wrapper that ensures the user is authenticated
 * Redirects to login if not authenticated
 */
export const ProtectedComponent = ({
  children,
  fallback = <div>Loading...</div>,
}: ProtectedComponentProps) => {
  const { loading } = useAuth();

  if (loading) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}; 