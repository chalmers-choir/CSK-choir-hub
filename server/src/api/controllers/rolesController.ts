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
