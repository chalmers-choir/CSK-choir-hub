// User types
export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: 'admin' | 'member';
  created_at: string;
  updated_at?: string;
}

// Event types
export interface Event {
  id: number;
  title: string;
  description?: string;
  date: string;
  time?: string;
  location?: string;
  max_participants?: number;
  created_by: number;
  created_at: string;
  updated_at: string;
  creator_name?: string;
  participant_count?: number;
}

export interface EventParticipant {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  status: string;
  registered_at: string;
}

export interface EventDetail {
  event: Event;
  participants: EventParticipant[];
}

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
  first_name: string;
  last_name: string;
}

export interface ProfileForm {
  first_name: string;
  last_name: string;
  email: string;
}

export interface CreateEventForm {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  max_participants: string;
}

// API Response types
export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ErrorResponse {
  error: string;
  message?: string;
}

// Context types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: Omit<RegisterForm, 'confirmPassword'>) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (profileData: ProfileForm) => Promise<{ success: boolean; error?: string }>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}
