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
    } catch {
      setUser(null);
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
    } catch (error) {
      console.error('Login failed:', error);
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
