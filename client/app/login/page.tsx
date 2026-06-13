'use client';

import { Suspense, useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { AuthLoading } from '@/components/auth/AuthLoading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { siteConfig } from '@/config/site';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/IntlContext/IntlContext';

function LoginPageContent() {
  const { login, isAuthenticated, loading } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const redirectTo = searchParams.get('next') || '/';

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, loading, redirectTo, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password, redirectTo);
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
      <h2 className="w-full text-center text-lg font-semibold">{t('welcome.singer')}</h2>
      <Input
        name="username"
        placeholder={t('common.username')}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        name="password"
        placeholder={t('common.password')}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button className="rounded-md px-8" type="submit">
        {t('common.login')}
      </Button>
      <Link
        className="mt-4 inline-block w-full text-center text-sm text-blue-500"
        href={siteConfig.links.register}
      >
        {t('common.no_account')}
      </Link>
    </form>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<AuthLoading />}>
      <LoginPageContent />
    </Suspense>
  );
}
