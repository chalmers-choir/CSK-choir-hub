/**
 * - groupModel.ts: For choir groups, sections, or ensembles.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Creates a new group with the given data.
 * @param data - The group data to create.
 * @returns The created group.
 */
export async function createGroup(data: { name: string; description?: string }) {
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
 * @param filters - Optional filters for type and/or name.
 * @returns An array of groups matching the filters.
 */
export async function listGroups(filters?: { name?: string }) {
    const where: any = {};
    if (filters?.name) {
        where.name = { contains: filters.name, mode: 'insensitive' };
    }
    return await prisma.group.findMany({
        where,
    });
}

/**
 * Lists members of a group.
 * @param groupId - The ID of the group.
 * @returns An array of users who are members of the group.
 */
export async function listGroupMembers(groupId: number) {
    return await prisma.groupMember.findMany({
        where: { groupId },
        include: { user: true },
    });
}

/**
 * Finds groups that a user belongs to.
 * @param userId - The ID of the user.
 * @returns An array of groups the user belongs to.
 */
export async function findGroupsByUser(userId: number) {
    return await prisma.groupMember.findMany({
        where: { userId },
        include: { group: true },
    });
}
