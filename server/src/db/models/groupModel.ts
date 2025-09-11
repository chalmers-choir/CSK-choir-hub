import { prisma } from '@db/prisma';
import { GroupType } from '@prisma/client';

/**
 * Creates a new group with the given data.
 * @param data - The group data to create.
 * @returns The created group.
 */
export async function createGroup(data: { name: string; type: GroupType; description?: string }) {
  return await prisma.group.create({
    data,
  });
}

/**
 * Finds a group by its ID.
 * @param id - The ID of the group to find.
 * @returns The group if found, otherwise null.
 */
export async function findGroupById(id: number) {
  return await prisma.group.findUnique({
    where: { id },
  });
}

/**
 * Updates a group with the given data.
 * @param id - The ID of the group to update.
 * @param data - The data to update.
 * @returns The updated group.
 */
export async function updateGroup(id: number, data: { name?: string; description?: string }) {
  return await prisma.group.update({
    where: { id },
    data,
  });
}

/**
 * Deletes a group by its ID.
 * @param id - The ID of the group to delete.
 * @returns The deleted group.
 */
export async function deleteGroup(id: number) {
  return await prisma.group.delete({
    where: { id },
  });
}

/**
 * Lists groups, optionally filtered by type or name.
 * @returns An array of groups matching the filters.
 */
export async function listGroups() {
  return await prisma.group.findMany();
}

/**
 * Lists members of a group.
 * @param groupId - The ID of the group.
 * @returns An array of users who are members of the group.
 */
// TODO - users can be member of several subgroups of the same parent group, so we need to deduplicate the users
export async function listGroupMembers(groupId: number, visited: Set<number> = new Set()) {
  if (visited.has(groupId)) return [];
  visited.add(groupId);

  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: { members: true, children: true },
  });

  if (!group) return [];

  const members = group.members;

  for (const subgroup of group.children) {
    const subgroupMembers = await listGroupMembers(subgroup.id);
    members.push(...subgroupMembers);
  }

  return members;
}

/**
 * Finds groups that a user belongs to.
 * @param userId - The ID of the user.
 * @returns An array of groups the user belongs to.
 */
export async function findGroupsByUser(userId: number) {
  return await prisma.group.findMany({
    where: { members: { some: { id: userId } } },
    include: { members: true },
  });
}
