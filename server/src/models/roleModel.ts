/**
 * - roleModel.ts: For role definitions and assignments (admin, member, etc.).
 */

import { PrismaClient, Role, UserRole } from '@prisma/client';

// Instantiate Prisma client
const prisma = new PrismaClient();

/**
 * Create a new role.
 * @param name Role name
 * @param description Role description (optional)
 */
export async function createRole(name: string, description?: string): Promise<Role> {
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
export async function updateRole(id: number, data: Partial<{ name: string; description: string }>): Promise<Role> {
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
 * Assign a role to a user.
 * If using explicit UserRole join table, can include startDate/endDate.
 * @param userId User ID
 * @param roleId Role ID
 * @param startDate Optional start date
 * @param endDate Optional end date
 */
export async function assignRoleToUser(
    userId: number,
    roleId: number,
    startDate?: Date,
    endDate?: Date
): Promise<UserRole> {
    return prisma.userRole.create({
        data: {
            userId,
            roleId,
            startDate,
            endDate,
        },
    });
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

