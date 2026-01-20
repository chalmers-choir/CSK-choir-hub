'use client';

import { siteConfig } from '@/config/site';
import { useAuth } from '@/contexts/AuthContext';
import DefaultLayout from '@/layouts/default';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Link } from '@heroui/link';
import { button as buttonStyles } from '@heroui/theme';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthLoading from '@/components/AuthLoading';

export default function RegisterPage() {
  const { register, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({
        username,
        password,
        email,
        firstName,
        lastName,
      });
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
          <h2 className="w-full text-center text-lg font-semibold">Register</h2>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          {error && <p className="text-red-500">{error}</p>}

          <Button
            type="submit"
            className={buttonStyles({ color: 'primary', radius: 'full', variant: 'shadow' })}
          >
            Register
          </Button>
          <Link
            href={siteConfig.links.login}
            className="mt-4 inline-block w-full text-center text-sm text-blue-500"
          >
            Already have an account? Login
          </Link>
        </form>
      )}
    </DefaultLayout>
  );
}
