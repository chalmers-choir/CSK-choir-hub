import { groupService } from '@services';
import { Request, Response } from 'express';

// Get all groups
export const getGroups = async (req: Request, res: Response) => {
  const groups = await groupService.getAllGroups();
  res.json({ groups });
};

// Delete a group by ID
export const deleteGroup = async (req: Request, res: Response) => {
  const groupId = parseInt(req.params.groupId, 10);
  if (isNaN(groupId)) return res.status(400).json({ error: 'Invalid group ID' });

  await groupService.deleteGroup(groupId);
  return res.status(204).send();
};

// Create a new group
export const createGroup = async (req: Request, res: Response) => {
  const { name, type, description } = req.body;
  if (!name || !type) return res.status(400).json({ error: 'Group name and type are required' });

  const newGroup = await groupService.createGroup({ name, type, description });
  return res.status(201).json({ group: newGroup });
};

// Update a group by ID
export const updateGroup = async (req: Request, res: Response) => {
  const groupId = parseInt(req.params.groupId, 10);
  if (isNaN(groupId)) return res.status(400).json({ error: 'Invalid group ID' });

  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error: 'Group name is required' });

  const updatedGroup = await groupService.updateGroup(groupId, { name, description });

  return res.json({ group: updatedGroup });
};

// Add a subgroup to a group
export const addGroupToGroup = async (req: Request, res: Response) => {
  const parentGroupId = parseInt(req.params.groupId, 10);
  const { subgroupId } = req.body;
  if (isNaN(parentGroupId) || isNaN(subgroupId)) {
    return res.status(400).json({ error: 'Invalid group ID or subgroup ID' });
  }

  await groupService.addGroup(subgroupId, parentGroupId);
  return res.status(204).send();
};

// Remove a subgroup from a group
export const removeGroupFromGroup = async (req: Request, res: Response) => {
  const parentGroupId = parseInt(req.params.groupId, 10);
  const subgroupId = parseInt(req.params.groupId, 10);
  if (isNaN(parentGroupId) || isNaN(subgroupId)) {
    return res.status(400).json({ error: 'Invalid group ID or subgroup ID' });
  }

  await groupService.removeGroup(subgroupId, parentGroupId);
  return res.status(204).send();
};

// Assign a role to a group
export const addRoleToGroup = async (req: Request, res: Response) => {
  const groupId = parseInt(req.params.groupId, 10);
  const { roleId } = req.body;
  if (isNaN(groupId) || isNaN(roleId)) {
    return res.status(400).json({ error: 'Invalid group ID or role ID' });
  }

  await groupService.addRole(roleId, groupId);
  return res.status(204).send();
};

// Remove a role from a group
export const removeRoleFromGroup = async (req: Request, res: Response) => {
  const groupId = parseInt(req.params.groupId, 10);
  const roleId = parseInt(req.params.roleId, 10);
  if (isNaN(groupId) || isNaN(roleId)) {
    return res.status(400).json({ error: 'Invalid group ID or role ID' });
  }

  await groupService.removeRole(roleId, groupId);
  return res.status(204).send();
};

// Add a user to a group
export const addUserToGroup = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const groupId = parseInt(req.params.groupId, 10);
  if (isNaN(userId) || isNaN(groupId)) {
    return res.status(400).json({ error: 'Invalid user ID or group ID' });
  }

  await groupService.addUser(userId, groupId);
  return res.status(204).send();
};

// Remove a user from a group
export const removeUserFromGroup = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10);
  const groupId = parseInt(req.params.groupId, 10);
  if (isNaN(userId) || isNaN(groupId)) {
    return res.status(400).json({ error: 'Invalid user ID or group ID' });
  }

  await groupService.removeUser(userId, groupId);
  return res.status(204).send();
};
