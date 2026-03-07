'use server';

import * as z from 'zod';

import { AuthService } from '@/lib/serverApiClient';

const SigninFormSchema = z.object({
  username: z.string().trim().min(1, { error: 'Username is required.' }),
  password: z.string().trim().min(1, { error: 'Password is required.' }),
});

export type FormState = {
  errors?: {
    username?: string[];
    password?: string[];
  };
  message?: string;
};

export async function signin(_prevState: FormState, formData: FormData): Promise<FormState> {
  // Validate form fields
  const validatedFields = SigninFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call the provider or db to create a user...
  // 2. Prepare data for insertion into database
  const { username, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  const res = await AuthService.loginUser({
    requestBody: {
      username,
      password,
    },
  });

  if (!res.user) {
    return {
      message: 'An error occurred while logging in.',
    };
  }

  // TODO:
  // 4. Create user session
  // 5. Redirect user
  return {};
}
