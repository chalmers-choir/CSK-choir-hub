import { prisma } from "@db";
import type { Role } from "@prisma/generated/client";

/**
 * Create a new role.
 * @param name Role name
 * @param description Role description (optional)
 */
export async function create(name: string, description?: string): Promise<Role> {
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
export async function findById(id: number): Promise<Role | null> {
  return prisma.role.findUnique({
    where: { id },
  });
}

/**
 * Find a role by its name.
 * @param name Role name
 */
export async function findByName(name: string): Promise<Role | null> {
  return prisma.role.findUnique({
    where: { name },
  });
}

/**
 * Update a role's information.
 * @param id Role ID
 * @param data Fields to update
 */
export async function update(
  id: number,
  data: Partial<{ name: string; description: string }>,
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
export async function deleteById(id: number): Promise<Role> {
  return prisma.role.delete({
    where: { id },
  });
}

/**
 * List all roles.
 */
export async function findAll(): Promise<Role[]> {
  return prisma.role.findMany();
}

/**
 * Get a user with a specific role.
 * @param roleId Role ID
 */
export async function getUserWithRole(roleId: number) {
  return prisma.role.findUnique({
    where: { id: roleId },
    include: { user: true },
  });
}

// Assigns a role to a user (many-to-many relation).
export const assignUser = async (userId: number, roleId: number) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      roles: { connect: { id: roleId } },
    },
  });
};

// Removes a role from a user (one-to-one relation).
export const removeUser = async (roleId: number) => {
  return prisma.role.update({
    where: { id: roleId },
    data: {
      userId: null,
    },
  });
};
