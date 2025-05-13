export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success?: boolean;
  statusCode?: number;
  error?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

export interface LoginResponse {
  success: boolean;
  access_token: string;
}

export interface ProfileResponse {
  _id: string;
  name: string;
  email: string;
  role: {
    _id: string;
    name: string;
    slug: string;
    permissions: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  school_id: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
} 