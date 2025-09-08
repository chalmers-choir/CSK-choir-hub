import type { Role } from "@prisma/client";

import { prisma } from "@db/prisma";

/**
 * Create a new role.
 * @param name Role name
 * @param description Role description (optional)
 */
export async function createRole(
  name: string,
  description?: string
): Promise<Role> {
  return prisma.role.create({
    data: {
      name,
      description,
    },
  });
}

/**
 * Find a role by its ID.
 * @param id Role ID
 */
export async function findRoleById(id: number): Promise<Role | null> {
  return prisma.role.findUnique({
    where: { id },
  });
}

/**
 * Find a role by its name.
 * @param name Role name
 */
export async function findRoleByName(name: string): Promise<Role | null> {
  return prisma.role.findUnique({
    where: { name },
  });
}

/**
 * Update a role's information.
 * @param id Role ID
 * @param data Fields to update
 */
export async function updateRole(
  id: number,
  data: Partial<{ name: string; description: string }>
): Promise<Role> {
  return prisma.role.update({
    where: { id },
    data,
  });
}

/**
 * Delete a role by its ID.
 * @param id Role ID
 */
export async function deleteRole(id: number): Promise<Role> {
  return prisma.role.delete({
    where: { id },
  });
}

/**
 * List all roles.
 */
export async function listRoles(): Promise<Role[]> {
  return prisma.role.findMany();
}

/**
 * List all users with a specific role.
 * @param roleId Role ID
 */
export async function listUsersWithRole(roleId: number) {
  return prisma.userRole.findMany({
    where: { roleId },
    include: { user: true },
  });
}

/**
 * Find all roles assigned to a user.
 * @param userId User ID
 */
export async function findRolesByUser(userId: number) {
  return prisma.userRole.findMany({
    where: { userId },
    include: { role: true },
  });
}
