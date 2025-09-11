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

export async function addGroupToGroup(parentGroupId: number, subgroupId: number) {
  // Implementation to add subgroupId to parentGroupId
  // This is a placeholder; actual implementation will depend on your database schema
  return;
}

export async function removeGroupFromGroup(parentGroupId: number, subgroupId: number) {
  // Implementation to remove subgroupId from parentGroupId
  // This is a placeholder; actual implementation will depend on your database schema
  return;
}

export async function addUserToGroup(groupId: number, userId: number) {
  // Implementation to add userId to groupId
  // This is a placeholder; actual implementation will depend on your database schema
  return;
}

export async function removeUserFromGroup(groupId: number, userId: number) {
  // Implementation to remove userId from groupId
  // This is a placeholder; actual implementation will depend on your database schema
  return;
}

export async function addRoleToGroup(groupId: number, roleId: number) {
  // Implementation to add roleId to groupId
  // This is a placeholder; actual implementation will depend on your database schema
  return;
}

export async function removeRoleFromGroup(groupId: number, roleId: number) {
  // Implementation to remove roleId from groupId
  // This is a placeholder; actual implementation will depend on your database schema
  return;
}
