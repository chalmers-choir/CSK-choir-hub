import { User } from '@/lib/api-client';

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

// Context types
export interface AuthContextType {
  user: User | undefined;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: Omit<RegisterForm, 'confirmPassword'>) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}
