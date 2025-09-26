'use client';

import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { addToast } from '@heroui/toast';

import { AuthContextType, AuthenticatedUser, RegisterForm } from '../types/auth';
import { siteConfig } from '@/config/site';
import axios from 'axios';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const api = axios.create({
  baseURL: siteConfig.apiBaseUrl + '/auth',
  withCredentials: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await api.get('/authenticate');
      setUser(res.data.user);
    } catch (error: any) {
      setUser(null);
      // Log 401 errors for debugging but don't redirect
      if (error.response?.status === 401) {
        console.log('Authentication failed:', error.response.data.error);
      }
      // Remove automatic redirect - let pages handle their own routing
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.post('/login', { username, password });
      setUser(res.data.user);
      router.push('/');
    } catch (error: any) {
      console.log('Login error details:', {
        response: error.response,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      // Handle axios errors properly
      if (error.response) {
        // Server responded with an error status
        const message = error.response.data?.error || error.response.data?.message;
        if (error.response.status === 401) {
          throw new Error(message || 'Invalid username/email or password');
        } else if (error.response.status === 400) {
          throw new Error(message || 'Please check your input');
        } else {
          throw new Error(message || `Server error (${error.response.status})`);
        }
      } else if (error.request) {
        // Network error
        throw new Error('Unable to connect to server. Please check your connection.');
      } else {
        // Something else
        throw new Error(error.message || 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Omit<RegisterForm, 'confirmPassword'>) => {
    setLoading(true);
    try {
      await api.post('/register', userData);
      router.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post('/logout');
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
      addToast({
        title: 'You have been logged out.',
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: 'danger',
      });
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.roles?.some((role) => role.name === 'admin') ?? false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
