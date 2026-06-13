'use client';

import { useEffect, useState } from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

import { AuthLoading } from '@/components/auth/AuthLoading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { siteConfig } from '@/config/site';
import { useAuth } from '@/contexts';

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

  return loading ? (
    <AuthLoading />
  ) : (
    <form
      className="mx-auto mt-20 flex max-w-sm flex-col items-center gap-2"
      onSubmit={handleSubmit}
    >
      <h2 className="w-full text-center text-lg font-semibold">Register</h2>
      <Input
        required
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        required
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <Input
        required
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Input
        required
        placeholder="First Name"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <Input
        required
        placeholder="Last Name"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      {error && <p className="text-red-500">{error}</p>}

      <Button className="rounded-md px-8" type="submit">
        Register
      </Button>
      <NextLink
        className="mt-4 inline-block w-full text-center text-sm text-blue-500"
        href={siteConfig.links.login}
      >
        Already have an account? Login
      </NextLink>
    </form>
  );
}
