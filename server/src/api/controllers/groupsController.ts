import { GroupType } from "@prisma/generated/client";
import { groupService } from "@services";
import { BadRequestError } from "@utils/errors";
import { NextFunction, Request, Response } from "express";

// Get all groups
export const getGroups = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const type = req.query.type as string | undefined;

    let groups;

    if (type) {
      // Validate that the type is a valid GroupType enum value
      const upperType = type.toUpperCase();
      const validTypes = Object.values(GroupType);

      if (!validTypes.includes(upperType as GroupType)) {
        return next(new BadRequestError("Invalid group type"));
      }

      groups = await groupService.getGroupsByType(upperType as GroupType);
    } else {
      groups = await groupService.getAllGroups();
    }

    res.json({ groups });
  } catch (error) {
    next(error);
  }
};

// Delete a group by ID
export const deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
  const groupId = parseInt(req.params.groupId, 10);

  if (isNaN(groupId)) return next(new BadRequestError("Invalid group ID"));

  try {
    await groupService.deleteGroup(groupId);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Create a new group
export const createGroup = async (req: Request, res: Response, next: NextFunction) => {
  const { name, type, description } = req.body;

  if (!name || !type) return next(new BadRequestError("Group name and type are required"));

  try {
    const newGroup = await groupService.createGroup({ name, type, description });

    return res.status(201).json({ group: newGroup });
  } catch (error) {
    next(error);
  }
};

// Update a group by ID
export const updateGroup = async (req: Request, res: Response, next: NextFunction) => {
  const groupId = parseInt(req.params.groupId, 10);

  if (isNaN(groupId)) return next(new BadRequestError("Invalid group ID"));

  const { name, description } = req.body;

  if (!name) return next(new BadRequestError("Group name is required"));

  try {
    const updatedGroup = await groupService.updateGroup(groupId, { name, description });

    return res.json({ group: updatedGroup });
  } catch (error) {
    next(error);
  }
};

// Add a subgroup to a group
export const addGroupToGroup = async (req: Request, res: Response, next: NextFunction) => {
  const parentGroupId = parseInt(req.params.groupId, 10);
  const { subgroupId } = req.body;

  if (isNaN(parentGroupId) || isNaN(subgroupId))
    return next(new BadRequestError("Invalid group ID or subgroup ID"));

  try {
    await groupService.addGroup(subgroupId, parentGroupId);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Remove a subgroup from a group
export const removeGroupFromGroup = async (req: Request, res: Response, next: NextFunction) => {
  const parentGroupId = parseInt(req.params.groupId, 10);
  const subgroupId = parseInt(req.params.groupId, 10);

  if (isNaN(parentGroupId) || isNaN(subgroupId))
    return next(new BadRequestError("Invalid group ID or subgroup ID"));

  try {
    await groupService.removeGroup(subgroupId, parentGroupId);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Assign a role to a group
export const addRoleToGroup = async (req: Request, res: Response, next: NextFunction) => {
  const groupId = parseInt(req.params.groupId, 10);
  const { roleId } = req.body;

  if (isNaN(groupId) || isNaN(roleId))
    return next(new BadRequestError("Invalid group ID or role ID"));

  try {
    await groupService.addRole(roleId, groupId);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Remove a role from a group
export const removeRoleFromGroup = async (req: Request, res: Response, next: NextFunction) => {
  const groupId = parseInt(req.params.groupId, 10);
  const roleId = parseInt(req.params.roleId, 10);

  if (isNaN(groupId) || isNaN(roleId))
    return next(new BadRequestError("Invalid group ID or role ID"));

  try {
    await groupService.removeRole(roleId, groupId);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Add a user to a group
export const addUserToGroup = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;
  const groupId = parseInt(req.params.groupId, 10);

  if (isNaN(userId) || isNaN(groupId))
    return next(new BadRequestError("Invalid user ID or group ID"));

  try {
    await groupService.addUser(userId, groupId);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Remove a user from a group
export const removeUserFromGroup = async (req: Request, res: Response, next: NextFunction) => {
  const userId = parseInt(req.params.userId, 10);
  const groupId = parseInt(req.params.groupId, 10);

  if (isNaN(userId) || isNaN(groupId))
    return next(new BadRequestError("Invalid user ID or group ID"));

  try {
    await groupService.removeUser(userId, groupId);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
