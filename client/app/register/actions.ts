'use server';

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

export async function signup(_prevState: FormState, formData: FormData): Promise<FormState> {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
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
  const { username, firstName, lastName, email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  const res = await AuthService.registerUser({
    requestBody: {
      username,
      firstName,
      lastName,
      email,
      password,
    },
  });

  if (!res.user) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }

  // TODO:
  // 4. Create user session
  // 5. Redirect user
  return {};
}
