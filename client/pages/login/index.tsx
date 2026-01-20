'use client';

import { useState } from 'react';

import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Link } from '@heroui/link';
import { button as buttonStyles } from '@heroui/theme';

import { siteConfig } from '@/config/site';
import { useAuth } from '@/contexts/AuthContext';
import DefaultLayout from '@/layouts/default';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AuthLoading from '@/components/AuthLoading';

export default function LoginPage() {
  const { login, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <DefaultLayout>
      {loading ? (
        <AuthLoading />
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto mt-20 flex max-w-sm flex-col gap-2">
          <h2 className="w-full text-center text-lg font-semibold">Login</h2>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button
            type="submit"
            className={buttonStyles({ color: 'primary', radius: 'full', variant: 'shadow' })}
          >
            Login
          </Button>
          <Link
            href={siteConfig.links.register}
            className="mt-4 inline-block w-full text-center text-sm text-blue-500"
          >
            Don't have an account? Register
          </Link>
        </form>
      )}
    </DefaultLayout>
  );
}
