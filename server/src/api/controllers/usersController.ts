import * as userService from '@services/userService';
import { Request, Response } from 'express';

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ users });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get a user by ID
export const getUserWithId = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) return res.status(400).json({ error: 'Invalid user ID' });

    const user = await userService.getUser(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.json({ user });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) return res.status(400).json({ error: 'Invalid user ID' });

    await userService.deleteUser(userId);
    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Assign a user to a group
export const addUserToGroup = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const groupId = parseInt(req.params.groupId, 10);
    if (isNaN(userId) || isNaN(groupId)) {
      return res.status(400).json({ error: 'Invalid user ID or group ID' });
    }

    await userService.addGroup(userId, groupId);
    return res.status(200).json({ message: 'User assigned to group successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Remove a user from a group
export const removeUserFromGroup = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const groupId = parseInt(req.params.groupId, 10);
    if (isNaN(userId) || isNaN(groupId)) {
      return res.status(400).json({ error: 'Invalid user ID or group ID' });
    }

    await userService.removeGroup(userId, groupId);
    return res.status(200).json({ message: 'User removed from group successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Assign a user to a role
export const assignUserToRole = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const roleId = parseInt(req.params.roleId, 10);
    if (isNaN(userId) || isNaN(roleId)) {
      return res.status(400).json({ error: 'Invalid user ID or role ID' });
    }

    await userService.assignRole(userId, roleId);
    return res.status(200).json({ message: 'User assigned to role successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Remove a user from a role
export const removeUserFromRole = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const roleId = parseInt(req.params.roleId, 10);
    if (isNaN(userId) || isNaN(roleId)) {
      return res.status(400).json({ error: 'Invalid user ID or role ID' });
    }

    await userService.removeRole(userId, roleId);
    return res.status(200).json({ message: 'User removed from role successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
