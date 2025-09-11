import * as roleService from '@services/roleService';
import { Request, Response } from 'express';

// Get all roles
export const getRolesHandler = async (req: Request, res: Response) => {
  try {
    const roles = await roleService.getAllRoles();
    res.json({ roles });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a role by ID
export const deleteRoleHandler = async (req: Request, res: Response) => {
  try {
    const roleId = parseInt(req.params.id, 10);
    if (isNaN(roleId)) return res.status(400).json({ error: 'Invalid role ID' });

    await roleService.deleteRole(roleId);
    return res.status(204).send();
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

    await roleService.assignUser(userId, roleId);
    return res.status(200).json({ message: 'User assigned to role successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Remove a user from a role
export const removeUserFromRole = async (req: Request, res: Response) => {
  try {
    const roleId = parseInt(req.params.roleId, 10);
    if (isNaN(roleId)) {
      return res.status(400).json({ error: 'Invalid role ID' });
    }

    await roleService.removeUser(roleId);
    return res.status(200).json({ message: 'User removed from role successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
