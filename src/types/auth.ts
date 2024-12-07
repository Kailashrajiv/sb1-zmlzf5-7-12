export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  createdAt: string;
  emailVerified: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  fullName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  password: string;
}