'use client';

import { useActionState } from 'react';

import { type FormState, signup } from '@/app/register/actions';

export default function SignupForm() {
  const initialState: FormState = {};
  const [state, action, pending] = useActionState(signup, initialState);

  return (
    <form action={action}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" placeholder="Username" />
      </div>
      {state?.errors?.username && <p>{state.errors.username}</p>}

      <div>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" placeholder="First Name" />
      </div>
      {state?.errors?.firstName && <p>{state.errors.firstName}</p>}

      <div>
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" placeholder="Last Name" />
      </div>
      {state?.errors?.lastName && <p>{state.errors.lastName}</p>}

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
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
      <button disabled={pending} type="submit">
        Sign Up
      </button>
    </form>
  );
}
