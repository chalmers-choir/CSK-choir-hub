import { groupModel } from '@db';
import { GroupType } from '@prisma/client';

export async function getAllGroups() {
  return groupModel.findAll();
}

export async function deleteGroup(groupId: number) {
  await groupModel.deleteById(groupId);
}

export async function createGroup(data: { name: string; type: GroupType; description?: string }) {
  return groupModel.create(data);
}

export async function updateGroup(
  groupId: number,
  data: { name?: string; type?: GroupType; description?: string },
) {
  return groupModel.update(groupId, data);
}

export async function addGroup(parentGroupId: number, subgroupId: number) {
  // Implementation to add subgroupId to parentGroupId
  // This is a placeholder; actual implementation will depend on your database schema
  return;
}

export async function removeGroup(parentGroupId: number, subgroupId: number) {
  // Implementation to remove subgroupId from parentGroupId
  // This is a placeholder; actual implementation will depend on your database schema
  return;
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

export async function addRole(groupId: number, roleId: number) {
  // Implementation to add roleId to groupId
  // This is a placeholder; actual implementation will depend on your database schema
  return;
}

export async function removeRole(groupId: number, roleId: number) {
  // Implementation to remove roleId from groupId
  // This is a placeholder; actual implementation will depend on your database schema
  return;
}
