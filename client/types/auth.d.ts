// User types
export interface AuthenticatedUser {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  roles: UserRole[];
  groups: UserGroup[];
}

export type UserRole = {
  id: number;
  name: string;
};

export type UserGroup = {
  id: number;
  name: string;
};

// Form types
export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

// API Response types
export interface AuthResponse {
  user: User;
  token: string;
}

// Context types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (
    userData: Omit<RegisterForm, 'confirmPassword'>,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}
