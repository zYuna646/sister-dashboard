import { ApiResponse, LoginResponse, ProfileResponse, LoginRequest } from "../types/api";
import { config } from "../lib/config";

export class AuthService {
  /**
   * Login with credentials
   * @param email User email
   * @param password User password
   * @returns Promise with authentication response
   */
  static async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    try {
      // Default credentials for demo if needed
      const credentials: LoginRequest = {
        email: email || "Admin@example.com",
        password: password || "Admin",
      };

      console.log(`Attempting login to ${config.api.baseUrl}${config.api.endpoints.login} with email: ${credentials.email}`);

      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.login}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Login failed",
          error: data.error,
          statusCode: data.statusCode || response.status,
        };
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "Network error. Please check your connection.",
      };
    }
  }

  /**
   * Get user profile
   * @param token Authentication token
   * @returns Promise with user profile data
   */
  static async getProfile(token: string): Promise<ApiResponse<ProfileResponse>> {
    try {
      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.profile}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Failed to get user profile",
          statusCode: data.statusCode || response.status,
        };
      }

      return {
        success: true,
        data: data.data,
        message: data.message,
        statusCode: data.statusCode,
      };
    } catch (error) {
      console.error("Get profile error:", error);
      return {
        success: false,
        message: "Network error. Please check your connection.",
      };
    }
  }

  /**
   * Validate a token
   * @param token Authentication token to validate
   * @returns Promise with validation result and user data if valid
   */
  static async validateToken(token: string): Promise<ApiResponse<ProfileResponse>> {
    try {
      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.validate}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Token validation failed",
          statusCode: data.statusCode || response.status,
        };
      }

      return {
        success: true,
        data: data.data,
        message: data.message,
        statusCode: data.statusCode,
      };
    } catch (error) {
      console.error("Token validation error:", error);
      return {
        success: false,
        message: "Network error. Please check your connection.",
      };
    }
  }
} 