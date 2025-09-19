'use client';

import { useAuth } from '@/contexts/AuthContext';
import DefaultLayout from '@/layouts/default';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Link } from '@heroui/link';
import { button as buttonStyles } from '@heroui/theme';
import { useState } from 'react';

export default function LoginPage() {
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

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
          href="/login/register"
          className="mt-4 inline-block w-full text-center text-sm text-blue-500"
        >
          Don't have an account? Register
        </Link>
      </form>
    </DefaultLayout>
  );
}
