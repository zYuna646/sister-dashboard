/**
 * Application configuration
 * 
 * This provides access to environment variables in a type-safe way
 * and ensures consistent use throughout the application.
 */

export const config = {
  api: {
    /**
     * Base URL for API requests
     */
    baseUrl: process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://api.example.com',
    
    /**
     * API endpoints
     */
    endpoints: {
      login: '/auth/login',
      profile: '/auth/profile',
      validate: '/auth/validate',
      logout: '/auth/logout',
    },
  },
  auth: {
    /**
     * Token storage key
     */
    tokenKey: 'auth-token',
    
    /**
     * User data storage key
     */
    userKey: 'user-data',
  },
}; 