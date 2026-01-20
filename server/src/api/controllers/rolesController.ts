import * as roleService from '@services/roleService';
import { BadRequestError } from '@utils/errors';
import { NextFunction, Request, Response } from 'express';

// Get all roles
export const getRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await roleService.getAllRoles();
    res.json({ roles });
  } catch (error) {
    next(error);
  }
};

// Create role
export const createRole = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description } = req.body;
  if (!name) return next(new BadRequestError('name not provided'));

  try {
    const newRole = await roleService.createRole(name, description);
    return res.status(201).json({ role: newRole });
  } catch (error) {
    next(error);
  }
};

// Delete a role by ID
export const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
  const roleId = parseInt(req.params.id, 10);
  if (isNaN(roleId)) return next(new BadRequestError('Invalid role ID'));

  try {
    await roleService.deleteRole(roleId);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Assign a user to a role
export const assignUserToRole = async (req: Request, res: Response, next: NextFunction) => {
  const userId = parseInt(req.params.userId, 10);
  const roleId = parseInt(req.params.roleId, 10);
  if (isNaN(userId) || isNaN(roleId))
    return next(new BadRequestError('Invalid user ID or role ID'));

  try {
    await roleService.assignUser(userId, roleId);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Remove a user from a role
export const removeUserFromRole = async (req: Request, res: Response, next: NextFunction) => {
  const roleId = parseInt(req.params.roleId, 10);
  if (isNaN(roleId)) return next(new BadRequestError('Invalid role ID'));

  try {
    await roleService.removeUser(roleId);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
