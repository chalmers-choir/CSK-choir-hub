import * as userService from '@services/userService';
import { Request, Response } from 'express';

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.json({ users });
};

// Get a user by ID
export const getUserWithId = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);
  if (isNaN(userId)) return res.status(400).json({ error: 'Invalid user ID' });

  const user = await userService.getUser(userId);
  return res.json({ user });
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);
  if (isNaN(userId)) return res.status(400).json({ error: 'Invalid user ID' });

  await userService.deleteUser(userId);
  return res.status(204).send();
};
