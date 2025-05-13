// This is a placeholder for real authentication logic
// In a real application, you would use a proper auth system like NextAuth.js or Auth0

import { AuthService } from "../services/auth-service";
import { config } from "./config";
import { ProfileResponse } from "../types/api";
import Cookies from 'js-cookie';

export interface User {
  id: string;
  name: string;
  email: string;
  role: {
    id: string;
    name: string;
    slug: string;
    permissions: string[];
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Login with credentials via API
 * @param credentials Login credentials
 * @returns User object if login successful, null otherwise
 */
export async function login(credentials: LoginCredentials): Promise<User | null> {
  try {
    const loginResult = await AuthService.login(credentials.email, credentials.password);
    
    if (loginResult.success && loginResult.data) {
      // Store token
      const token = loginResult.data.access_token;
      storeToken(token);
      
      // Fetch user profile using the token
      const profileResult = await AuthService.getProfile(token);
      
      if (profileResult.success && profileResult.data) {
        const profileData = profileResult.data as ProfileResponse;
        
        // Transform profile data to User object
        const user: User = {
          id: profileData._id,
          name: profileData.name,
          email: profileData.email,
          role: {
            id: profileData.role._id,
            name: profileData.role.name,
            slug: profileData.role.slug,
            permissions: profileData.role.permissions,
          }
        };
        
        // Store user data
        sessionStorage.setItem(config.auth.userKey, JSON.stringify(user));
        return user;
      }
    }
    
    console.error("Login failed:", loginResult.message);
    return null;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}

/**
 * Store authentication token in both localStorage and cookies
 * @param token The token to store
 */
function storeToken(token: string): void {
  try {
    // Store in localStorage for easy access from JavaScript
    localStorage.setItem(config.auth.tokenKey, token);
    
    // Store in cookies for middleware access
    Cookies.set(config.auth.tokenKey, token, { 
      expires: 7, // 7 days
      path: '/',
      secure: window.location.protocol === 'https:',
      sameSite: 'lax'
    });
  } catch (error) {
    console.error('Error storing token:', error);
  }
}

/**
 * Remove authentication token from both localStorage and cookies
 */
function removeToken(): void {
  try {
    // Remove from localStorage
    localStorage.removeItem(config.auth.tokenKey);
    
    // Remove from cookies
    Cookies.remove(config.auth.tokenKey, { path: '/' });
  } catch (error) {
    console.error('Error removing token:', error);
  }
}

/**
 * Logout the current user
 */
export async function logout(): Promise<void> {
  try {
    // In a real app, you would call a logout endpoint
    // await AuthService.logout();
    
    // Clear tokens and session
    removeToken();
    sessionStorage.removeItem(config.auth.userKey);
  } catch (error) {
    console.error("Logout error:", error);
  }
}

/**
 * Validate the current authentication token
 * @returns True if token is valid, false otherwise
 */
export async function validateToken(): Promise<boolean> {
  try {
    const token = getToken();
    if (!token) return false;
    
    const result = await AuthService.validateToken(token);
    
    if (result.success && result.data) {
      // Update stored user data with fresh data
      const profileData = result.data as ProfileResponse;
      
      const user: User = {
        id: profileData._id,
        name: profileData.name,
        email: profileData.email,
        role: {
          id: profileData.role._id,
          name: profileData.role.name,
          slug: profileData.role.slug,
          permissions: profileData.role.permissions,
        }
      };
      
      // Update stored user data
      sessionStorage.setItem(config.auth.userKey, JSON.stringify(user));
      return true;
    }
    
    // If validation failed, clear auth data
    if (result.statusCode === 401) {
      logout();
    }
    
    return false;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
}

/**
 * Get the current authenticated user
 * @returns User object if authenticated, null otherwise
 */
export function getCurrentUser(): User | null {
  try {
    const userData = sessionStorage.getItem(config.auth.userKey);
    if (!userData) return null;
    
    return JSON.parse(userData) as User;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

/**
 * Check if user is authenticated
 * @returns true if authenticated, false otherwise
 */
export function isAuthenticated(): boolean {
  return !!getCurrentUser() && !!getToken();
}

/**
 * Get the authentication token
 * @returns token string or null
 */
export function getToken(): string | null {
  return localStorage.getItem(config.auth.tokenKey);
} 