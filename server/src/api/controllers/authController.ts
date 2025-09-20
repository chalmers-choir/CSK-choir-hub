import * as authService from '@services/authService';
import * as userService from '@services/userService';
import { Request, Response } from 'express';
import { z } from 'zod';

export const register = async (req: Request, res: Response) => {
  // TODO: Rules for Registration
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

    // Determine if input is an email
    const isEmail = username.includes('@');

    // Call the login service to get token
    // token -> authenticator
    const token = await authService.loginUser({
      identifier: username,
      type: isEmail ? 'email' : 'username',
      password,
    });

    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // require HTTPS in prod
      sameSite: 'strict', // or "none" if frontend is on a different domain
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });

    return res.json({ token });
  } catch (err: any) {
    return res.status(401).json({ error: err.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
  return res.sendStatus(200);
};

export const authenticate = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const userId = await userService.getUserIdFromToken(token);
    if (!userId) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const user = await userService.getUser(userId);
    return res.json({ user });
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
};
