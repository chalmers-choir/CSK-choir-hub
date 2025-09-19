'use client';

import { AuthContextType, AuthenticatedUser, RegisterForm } from '../types/auth';
import { siteConfig } from '@/config/site';
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
    try {
      const res = await api.get('/authenticate');
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (username: string, password: string) => {
    await api.post('/login', { username, password });
    await fetchUser();
    router.push('/');
  };

  const register = async (userData: Omit<RegisterForm, 'confirmPassword'>) => {
    await api.post('/register', userData);
    await fetchUser();
    router.push('/login');
  };

  const logout = async () => {
    await api.post('/logout');
    setUser(null);
    router.push('/');
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.roles.some((role) => role.name === 'admin') || false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
