'use client';

import { useActionState } from 'react';

import { Button, Input } from '@heroui/react';
import { button as buttonStyles } from '@heroui/theme';

import { type FormState, signup } from '@/app/register/actions';

export default function SignupForm() {
  const initialState: FormState = {};
  const [state, formAction, pending] = useActionState(signup, initialState);

  return (
    <form action={formAction}>
      <div className="mx-auto flex max-w-sm flex-col gap-4">
        <h1 className="text-center text-2xl font-bold">Register</h1>
        <div>
          <label htmlFor="username">Username</label>
          <Input id="username" name="username" placeholder="Username" required />
        </div>
        {state?.errors?.username && <p>{state.errors.username}</p>}

        <div>
          <label htmlFor="firstName">First Name</label>
          <Input id="firstName" name="firstName" placeholder="First Name" required />
        </div>
        {state?.errors?.firstName && <p>{state.errors.firstName}</p>}

        <div>
          <label htmlFor="lastName">Last Name</label>
          <Input id="lastName" name="lastName" placeholder="Last Name" required />
        </div>
        {state?.errors?.lastName && <p>{state.errors.lastName}</p>}

        <div>
          <label htmlFor="email">Email</label>
          <Input id="email" name="email" placeholder="Email" required />
        </div>
        {state?.errors?.email && <p>{state.errors.email}</p>}

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
          Sign Up
        </Button>
      </div>
    </form>
  );
}
