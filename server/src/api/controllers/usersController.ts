import * as userService from '@services/userService';
import { Request, Response } from 'express';

// Get all users
export const getUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ users });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get a user by ID
export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) return res.status(400).json({ error: 'Invalid user ID' });

    const user = await userService.getUser(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.json({ user });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete a user by ID
export const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) return res.status(400).json({ error: 'Invalid user ID' });

    await userService.deleteUser(userId);
    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
