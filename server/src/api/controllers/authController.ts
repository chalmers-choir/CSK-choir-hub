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
  });

  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: z.treeifyError(result.error) });
  }

  const { email, password, username, firstName, lastName } = req.body;

  if (!email || !password || !username || !firstName || !lastName) {
    return res
      .status(400)
      .json({ error: 'Email, username, password, first name and last name are required' });
  }

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

    return res.json({ token });
  } catch (err: any) {
    return res.status(401).json({ error: err.message });
  }
};

export const authenticate = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1]; // Expecting "Bearer <token>"
    if (!token) {
      return res.status(401).json({ error: 'Token missing from Authorization header' });
    }

    const userId = await userService.getUserIdFromToken(token);

    if (!userId) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const user = await userService.getUser(userId);

    return res.json({ user });
  } catch (err: any) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
