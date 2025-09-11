import { groupService } from '@services';
import { Request, Response } from 'express';

// Get all groups
export const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = await groupService.getAllGroups();
    res.json({ groups });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a group by ID
export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const groupId = parseInt(req.params.groupId, 10);
    if (isNaN(groupId)) return res.status(400).json({ error: 'Invalid group ID' });

    await groupService.deleteGroup(groupId);
    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Create a new group
export const createGroup = async (req: Request, res: Response) => {
  try {
    const { name, type, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Group name is required' });
    if (!type) return res.status(400).json({ error: 'Group type is required' });

    const newGroup = await groupService.createGroup({ name, type, description });
    return res.status(201).json({ group: newGroup });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Update a group by ID
export const updateGroup = async (req: Request, res: Response) => {
  try {
    const groupId = parseInt(req.params.groupId, 10);
    if (isNaN(groupId)) return res.status(400).json({ error: 'Invalid group ID' });

    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Group name is required' });

    const updatedGroup = await groupService.updateGroup(groupId, { name, description });
    if (!updatedGroup) return res.status(404).json({ error: 'Group not found' });

    return res.json({ group: updatedGroup });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Add a subgroup to a group
export const addGroupToGroup = async (req: Request, res: Response) => {
  try {
    const parentGroupId = parseInt(req.params.groupId, 10);
    const { subgroupId } = req.body;
    if (isNaN(parentGroupId) || isNaN(subgroupId)) {
      return res.status(400).json({ error: 'Invalid group ID or subgroup ID' });
    }

    await groupService.addGroupToGroup(subgroupId, parentGroupId);
    return res.status(200).json({ message: 'Subgroup added successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Remove a subgroup from a group
export const removeGroupFromGroup = async (req: Request, res: Response) => {
  try {
    const parentGroupId = parseInt(req.params.groupId, 10);
    const subgroupId = parseInt(req.params.groupId, 10);
    if (isNaN(parentGroupId) || isNaN(subgroupId)) {
      return res.status(400).json({ error: 'Invalid group ID or subgroup ID' });
    }

    await groupService.removeGroupFromGroup(subgroupId, parentGroupId);
    return res.status(200).json({ message: 'Subgroup removed successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Assign a role to a group
export const addRoleToGroup = async (req: Request, res: Response) => {
  try {
    const groupId = parseInt(req.params.groupId, 10);
    const { roleId } = req.body;
    if (isNaN(groupId) || isNaN(roleId)) {
      return res.status(400).json({ error: 'Invalid group ID or role ID' });
    }

    await groupService.addRoleToGroup(roleId, groupId);
    return res.status(200).json({ message: 'Role assigned to group successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Remove a role from a group
export const removeRoleFromGroup = async (req: Request, res: Response) => {
  try {
    const groupId = parseInt(req.params.groupId, 10);
    const roleId = parseInt(req.params.roleId, 10);
    if (isNaN(groupId) || isNaN(roleId)) {
      return res.status(400).json({ error: 'Invalid group ID or role ID' });
    }

    await groupService.removeRoleFromGroup(roleId, groupId);
    return res.status(200).json({ message: 'Role removed from group successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Add a user to a group
export const addUserToGroup = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const groupId = parseInt(req.params.groupId, 10);
    if (isNaN(userId) || isNaN(groupId)) {
      return res.status(400).json({ error: 'Invalid user ID or group ID' });
    }

    await groupService.addUserToGroup(userId, groupId);
    return res.status(200).json({ message: 'User added to group successfully' });
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

    await groupService.removeUserFromGroup(userId, groupId);
    return res.status(200).json({ message: 'User removed from group successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
