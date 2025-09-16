'use client';

import { AuthContextType, AuthResponse, AuthenticatedUser, RegisterForm } from '../types/auth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();

  const api = axios.create();

  // Attach token to request headers if token is set
  api.interceptors.request.use((config) => {
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  // Load token from localStorage after mount (to be SSR safe)
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  // Fetch user data when token changes
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        return;
      }
      try {
        const response = await api.get<{ user: AuthenticatedUser }>(
          'http://localhost:5000/api/auth/authenticate',
        );
        setUser(response.data.user);
        router.push('/');
      } catch (error: any) {
        if (error.response?.status === 401) {
          logout();
        } else {
          console.error('Failed to authenticate user:', error);
        }
        setUser(null);
      }
    };
    fetchUser();
  }, [token]);

  const login = async (
    username: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await api.post<AuthResponse>('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      const { token: authToken } = response.data;

      setToken(authToken);
      document.cookie = `token=${authToken}; path=/; max-age=86400`; // 1 day

      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.error || 'Login failed';
      return { success: false, error: message };
    }
  };

  const register = async (
    userData: Omit<RegisterForm, 'confirmPassword'>,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await api.post<AuthResponse>(
        'http://localhost:5000/api/auth/register',
        userData,
      );

      const { user: newUser, token: authToken } = response.data;

      setUser(newUser);
      setToken(authToken);
      document.cookie = `token=${authToken}; path=/; max-age=86400`; // 1 day

      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.error || 'Registration failed';
      return { success: false, error: message };
    }
  };

  const logout = (): void => {
    setUser(null);
    setToken(null);
    document.cookie = 'token=; path=/; max-age=0';
    router.push('/login');
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: (user?.roles ?? []).some((role) => role.name === 'admin'),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
