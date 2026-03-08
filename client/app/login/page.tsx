'use client';

import { useActionState } from 'react';

import Link from 'next/link';

import { Button, Input } from '@heroui/react';
import { button as buttonStyles } from '@heroui/theme';

import { type FormState, signin } from '@/app/login/actions';
import { siteConfig } from '@/config/site';
import { useTranslation } from '@/contexts/IntlContext';

export default function SigninForm() {
  const { t } = useTranslation();
  const initialState: FormState = {};
  const [state, formAction, pending] = useActionState(signin, initialState);

  return (
    <form action={formAction}>
      <div className="mx-auto flex max-w-sm flex-col gap-4">
        <h1 className="text-center text-2xl font-bold">Sign In</h1>
        <div>
          <label htmlFor="username">Username</label>
          <Input id="username" name="username" placeholder="Username" required />
        </div>
        {state?.errors?.username && <p>{state.errors.username}</p>}

        <div>
          <label htmlFor="password">Password</label>
          <Input id="password" name="password" placeholder="Password" type="password" required />
        </div>
        {state?.errors?.password && <p>{state.errors.password}</p>}

        <p aria-live="polite">{state?.message}</p>
        <Button
          className={buttonStyles({ color: 'primary', radius: 'md', variant: 'shadow' }) + ' px-8'}
          type="submit"
          disabled={pending}
        >
          {t('common.login')}
        </Button>

        <Link
          className="mt-4 inline-block w-full text-center text-sm text-blue-500"
          href={siteConfig.links.register}
        >
          {t('common.no_account')}
        </Link>
      </div>
    </form>
  );
}
