'use server';

import { redirect } from 'next/navigation';

import * as z from 'zod';

import { AuthService } from '@/lib/serverApiClient';

const SignupFormSchema = z.object({
  username: z.string().trim().min(1, { error: 'Username is required.' }),
  firstName: z.string().min(2, { error: 'First name must be at least 2 characters long.' }).trim(),
  lastName: z.string().min(2, { error: 'Last name must be at least 2 characters long.' }).trim(),
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
  password: z.string().trim().min(1, { error: 'Password is required.' }),
});

export type FormState = {
  errors?: {
    username?: string[];
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
};

export async function signup(initialState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, firstName, lastName, email, password } = validatedFields.data;

  try {
    const response = await AuthService.registerUser({
      requestBody: {
        username,
        firstName,
        lastName,
        email,
        password,
      },
    });
  } catch (error) {
    const fallback = error instanceof Error ? error.message : 'An error occurred while logging in.';

    return {
      message: fallback,
    };
  }

  redirect('/');
}
