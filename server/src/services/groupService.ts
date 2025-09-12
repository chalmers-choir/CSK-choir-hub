import { groupModel } from '@db';
import { GroupType } from '@prisma/client';
import { NotFoundError } from '@utils';

/**
 * Get all groups in the system.
 * @returns All groups in the system.
 */
export async function getAllGroups() {
  return await groupModel.findAll();
}

/**
 * Delete a group by ID.
 * @param groupId - The ID of the group to delete.
 */
export async function deleteGroup(groupId: number) {
  await groupModel.deleteById(groupId);
}

/**
 * Create a new group.
 * @param data - The group data.
 * @returns The created group.
 */
export async function createGroup(data: { name: string; type: GroupType; description?: string }) {
  return await groupModel.create(data);
}

/**
 * Update a group by ID.
 * @param groupId - The ID of the group to update.
 * @param data - The updated group data.
 * @returns The updated group.
 */
export async function updateGroup(
  groupId: number,
  data: { name?: string; type?: GroupType; description?: string },
) {
  const group = await groupModel.findById(groupId);
  if (!group) throw new NotFoundError('Group not found');
  return await groupModel.update(groupId, data);
}

/**
 * Add a subgroup to a parent group.
 * @param parentGroupId - The ID of the parent group.
 * @param subgroupId - The ID of the subgroup to add.
 * @returns {Promise<void>}
 */
export async function addGroup(parentGroupId: number, subgroupId: number) {
  const parentGroup = await groupModel.findById(parentGroupId);
  if (!parentGroup) throw new NotFoundError('Parent group not found');

  const subgroup = await groupModel.findById(subgroupId);
  if (!subgroup) throw new NotFoundError('Subgroup not found');
  return await groupModel.addGroup(parentGroupId, subgroupId);
}

/**
 * Remove a subgroup from a parent group.
 * @param parentGroupId - The ID of the parent group.
 * @param subgroupId - The ID of the subgroup to remove.
 * @returns {Promise<void>}
 */
export async function removeGroup(parentGroupId: number, subgroupId: number) {
  const parentGroup = await groupModel.findById(parentGroupId);
  if (!parentGroup) throw new NotFoundError('Parent group not found');

  const subgroup = await groupModel.findById(subgroupId);
  if (!subgroup) throw new NotFoundError('Subgroup not found');

  return await groupModel.removeGroup(parentGroupId, subgroupId);
}

/**
 * Add a group to a user.
 * @param {number} userId - The user ID.
 * @param {number} groupId - The group ID.
 * @returns {Promise<void>}
 */
export async function addUser(userId: number, groupId: number): Promise<void> {
  await groupModel.addUser(userId, groupId);
}

/**
 * Remove a group from a user.
 * @param {number} userId - The user ID.
 * @param {number} groupId - The group ID.
 * @returns {Promise<void>}
 */
export async function removeUser(userId: number, groupId: number): Promise<void> {
  await groupModel.removeUser(userId, groupId);
}

/**
 * Add a role to a group.
 * @param groupId - The ID of the group to add the role to.
 * @param roleId - The ID of the role to add.
 * @returns {Promise<void>}
 */
export async function addRole(groupId: number, roleId: number) {
  const group = await groupModel.findById(groupId);
  if (!group) throw new NotFoundError('Group not found');

  const role = await groupModel.findById(roleId);
  if (!role) throw new NotFoundError('Role not found');

  return await groupModel.addRole(groupId, roleId);
}

/**
 * Remove a role from a group.
 * @param groupId - The ID of the group to remove the role from.
 * @param roleId - The ID of the role to remove.
 * @returns {Promise<void>}
 */
export async function removeRole(groupId: number, roleId: number) {
  const group = await groupModel.findById(groupId);
  if (!group) throw new NotFoundError('Group not found');

  const role = await groupModel.findById(roleId);
  if (!role) throw new NotFoundError('Role not found');

  return await groupModel.removeRole(groupId, roleId);
}
