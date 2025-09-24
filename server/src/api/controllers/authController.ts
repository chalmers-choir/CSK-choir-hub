import * as authService from '@services/authService';
import * as userService from '@services/userService';
import { Request, Response } from 'express';
import { z } from 'zod';

type CookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'strict' | 'lax' | 'none';
  path: string;
};

const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
};

export const register = async (req: Request, res: Response) => {
  // TODO: Rules for Registration in frontend
  const registerSchema = z.object({
    email: z.email(),
    username: z.string().min(3),
    password: z.string().min(6),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  });

  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: z.treeifyError(result.error) });
  }

  const { email, password, username, firstName, lastName } = req.body;

  const token = await userService.registerUser({
    email,
    password,
    username,
    firstName,
    lastName,
  });

  return res.status(201).json({ token });
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username / email and password are required' });
    }

    // Determine if input is an email using zod
    const isEmail = z.email().safeParse(username).success;

    // Call the login service to get token
    const token = await authService.loginUser({
      identifier: username,
      type: isEmail ? 'email' : 'username',
      password,
    });

    res.clearCookie('token', COOKIE_OPTIONS);
    res.cookie('token', token, { ...COOKIE_OPTIONS, maxAge: 24 * 60 * 60 * 1000 });

    const user = await userService.getUserFromToken(token);

    return res.json({ user });
  } catch (error: any) {
    // Handle authentication errors properly
    if (error.name === 'NotFoundError') {
      return res.status(401).json({ error: 'Invalid username/email or password' });
    }
    // Re-throw other errors to be handled by error middleware
    throw error;
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token', COOKIE_OPTIONS);
  return res.sendStatus(200);
};

export const authenticate = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await userService.getUserFromToken(token);
    return res.json({ user });
  } catch (error: any) {
    // Handle invalid token errors
    if (error.name === 'UnauthorizedError') {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    // Re-throw other errors to be handled by error middleware
    throw error;
  }
};
