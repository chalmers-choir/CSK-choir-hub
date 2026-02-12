import type { Choir, User, Voice } from "@prisma/generated/client";
import { prisma } from "@db";
import { RegisterInput } from "@services/userService";

// Creates a new user with the provided data.
export const createUser = async (userData: RegisterInput) => {
  const { email, password, username, firstName, lastName } = userData;

  return prisma.user.create({
    data: {
      email,
      passwordHash: password,
      username,
      firstName,
      lastName,
    },
  });
};

// Finds a user by their email address.
export const findByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

// Finds a user by their username.
export const findByUsername = async (username: string) => {
  return prisma.user.findUnique({ where: { username } });
};

/**
 * Finds a user by their ID.
 * @param id
 * @param param optional include parameters
 * @returns A user object or null if not found.
 */

type IncludeParams = {
  roles?: boolean;
  groups?: boolean;
};
export const findById = async (id: number, param?: IncludeParams) => {
  return prisma.user.findUnique({ where: { id }, include: { ...param } });
};

// Updates user fields by ID. Provide an object with fields to update.
export const updateUser = async (id: number, updateData: Partial<User>) => {
  return prisma.user.update({
    where: { id },
    data: updateData,
  });
};

// Deletes a user by ID.
export const deleteUser = async (id: number) => {
  return prisma.user.delete({ where: { id } });
};

// Lists all users, with optional filtering (e.g., by choirId, voice, etc.).
export const getUsers = async (
  filter: Partial<{
    choir: Choir;
    voice: Voice;
    roleId: number;
    groupId: number;
  }> = {},
) => {
  const where: any = {};

  if (filter.choir) where.choir = filter.choir;
  if (filter.voice) where.voice = filter.voice;
  // Filtering by roleId requires relation query
  if (filter.roleId) {
    where.roles = { some: { id: filter.roleId } };
  }
  if (filter.groupId) {
    where.groups = { some: { id: filter.groupId } };
  }

  return prisma.user.findMany({ where });
};

// Finds all users assigned a specific role.
export const findByRole = async (roleId: number) => {
  return prisma.user.findMany({
    where: {
      roles: { some: { id: roleId } },
    },
  });
};

export const findRolesByUser = async (userId: number) => {
  return prisma.role.findMany({
    where: { user: { id: userId } },
  });
};

// Finds all users with a specific group.
export const findByGroup = async (groupId: number) => {
  return prisma.user.findMany({
    where: {
      groups: { some: { id: groupId } },
    },
  });
};

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
