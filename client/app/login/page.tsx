'use client';

import { useActionState } from 'react';

import Link from 'next/link';

import { Button, Form, Input } from '@heroui/react';
import { button as buttonStyles } from '@heroui/theme';

import { type FormState, signin } from '@/app/login/actions';
import { siteConfig } from '@/config/site';
import { useTranslation } from '@/contexts/IntlContext';

export default function SigninForm() {
  const { t } = useTranslation();
  const initialState: FormState = {};
  const [state, action, pending] = useActionState(signin, initialState);

  return (
    <Form action={action}>
      <div>
        <label htmlFor="username">Username</label>
        <Input id="username" name="username" placeholder="Username" />
      </div>
      {state?.errors?.username && <p>{state.errors.username}</p>}

      <div>
        <label htmlFor="password">Password</label>
        <Input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
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
    </Form>
  );
}
