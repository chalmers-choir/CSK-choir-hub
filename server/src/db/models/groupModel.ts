import { prisma } from "@db";
import { type GroupType } from "@prisma/generated/client";

/**
 * Creates a new group with the given data.
 * @param data - The group data to create.
 * @returns The created group.
 */
export async function create(data: { name: string; type: GroupType; description?: string }) {
  return await prisma.group.create({
    data,
  });
}

/**
 * Finds a group by its ID.
 * @param id - The ID of the group to find.
 * @returns The group if found, otherwise null.
 */
export async function findById(id: number) {
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
export async function update(id: number, data: { name?: string; description?: string }) {
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
export async function deleteById(id: number) {
  return await prisma.group.delete({
    where: { id },
  });
}

/**
 * Lists groups, optionally filtered by type or name.
 * @returns An array of groups matching the filters.
 */
export async function findAll() {
  return await prisma.group.findMany();
}

/**
 * Finds groups matching the given filters.
 * @param filters - The filters to apply (type and/or name).
 * @returns An array of groups matching the filters.
 */
export async function findBy(filters: { type?: GroupType; name?: string }) {
  const where: any = {};

  if (filters.type) where.type = filters.type;
  if (filters.name) where.name = { contains: filters.name, mode: "insensitive" };

  return await prisma.group.findMany({ where });
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

// Adds a user to a group (many-to-many relation).
export const addUser = async (userId: number, groupId: number) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      groups: { connect: { id: groupId } },
    },
  });
};

// Removes a user from a group (many-to-many relation).
export const removeUser = async (userId: number, groupId: number) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      groups: { disconnect: { id: groupId } },
    },
  });
};

// Adds a role to a group (many-to-many relation).
export const addRole = async (groupId: number, roleId: number) => {
  return prisma.group.update({
    where: { id: groupId },
    data: {
      roles: { connect: { id: roleId } },
    },
  });
};

// Removes a role from a group (many-to-many relation).
export const removeRole = async (roleId: number, groupId: number) => {
  return prisma.group.update({
    where: { id: groupId },
    data: {
      roles: { disconnect: { id: roleId } },
    },
  });
};

// Adds a subgroup to a parent group (self-referential many-to-many relation).
export const addGroup = async (parentGroupId: number, subgroupId: number) => {
  return prisma.group.update({
    where: { id: parentGroupId },
    data: {
      children: { connect: { id: subgroupId } },
    },
  });
};

// Removes a subgroup from a parent group (self-referential many-to-many relation).
export const removeGroup = async (parentGroupId: number, subgroupId: number) => {
  return prisma.group.update({
    where: { id: parentGroupId },
    data: {
      children: { disconnect: { id: subgroupId } },
    },
  });
};
