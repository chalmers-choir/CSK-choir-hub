import * as roleService from '@services/roleService';
import { Request, Response } from 'express';

// Get all roles
export const getRoles = async (req: Request, res: Response) => {
  const roles = await roleService.getAllRoles();
  res.json({ roles });
};

// Create role
export const createRole = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'name not provided' });
  }
  const newRole = await roleService.createRole(name, description);
  return res.status(201).json({ role: newRole });
};

// Delete a role by ID
export const deleteRole = async (req: Request, res: Response) => {
  const roleId = parseInt(req.params.id, 10);
  if (isNaN(roleId)) return res.status(400).json({ error: 'Invalid role ID' });

  await roleService.deleteRole(roleId);
  return res.status(204).send();
};

// Assign a user to a role
export const assignUserToRole = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);
  const roleId = parseInt(req.params.roleId, 10);
  if (isNaN(userId) || isNaN(roleId)) {
    return res.status(400).json({ error: 'Invalid user ID or role ID' });
  }

  await roleService.assignUser(userId, roleId);
  return res.status(204).send();
};

// Remove a user from a role
export const removeUserFromRole = async (req: Request, res: Response) => {
  const roleId = parseInt(req.params.roleId, 10);
  if (isNaN(roleId)) {
    return res.status(400).json({ error: 'Invalid role ID' });
  }

  await roleService.removeUser(roleId);
  return res.status(204).send();
};
