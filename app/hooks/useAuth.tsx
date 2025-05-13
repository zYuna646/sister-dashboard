"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, validateToken, getCurrentUser, User } from "@/app/lib/auth";

/**
 * Authentication hook for protecting client-side routes
 * 
 * @param redirectTo Path to redirect unauthenticated users to
 * @returns Object containing authentication state and user info
 */
export function useAuth(redirectTo = "/auth/login") {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        // Check if user is already authenticated client-side
        if (!isAuthenticated()) {
          router.push(redirectTo);
          return;
        }

        // Validate token with the server
        const isValid = await validateToken();
        
        if (!isValid) {
          router.push(redirectTo);
          return;
        }

        // Get user data after validation
        const userData = getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Auth check error:", error);
        router.push(redirectTo);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, redirectTo]);

  return { user, loading, isAuthenticated: !!user };
} 