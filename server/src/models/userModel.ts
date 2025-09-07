/**
 * - userModel.ts: For user-related database operations.
 */

import { Choir, PrismaClient, Voice } from "@prisma/client";

import { RegisterInput } from "../services/userService";

const prisma = new PrismaClient();

// Creates a new user with the provided data.
export const createUser = async (
    userData: RegisterInput
) => {
    const { email, password, username, firstName, lastName, choir, voice } = userData;
    return prisma.user.create({
        data: {
            email,
            passwordHash: password,
            username,
            firstName,
            lastName,
            choir,
            voice,
        },
    });
};

// Finds a user by their email address.
export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
};

// Finds a user by their username.
export const findUserByUsername = async (username: string) => {
    return prisma.user.findUnique({ where: { username } });
};

// Finds a user by their ID.
export const findUserById = async (id: number) => {
    return prisma.user.findUnique({ where: { id } });
};

// Finds a user by their ID, including their roles.
export const findUserByIdWithRoles = async (id: number) => {
    return prisma.user.findUnique({ where: { id }, include: { roles: true } });
}

// Updates user fields by ID. Provide an object with fields to update.
export const updateUser = async (id: number, updateData: Partial<{ email: string; password: string; username: string; firstName: string; lastName: string; choirId: number; voice: Voice; }>) => {
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
export const getUsers = async (filter: Partial<{ choir: Choir; voice: Voice; roleId: number; groupId: number }> = {}) => {
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
export const findUserByRole = async (roleId: number) => {
    return prisma.user.findMany({
        where: {
            roles: { some: { id: roleId } },
        },
    });
};

// Finds all users in a given choir (by choirId).
export const findUserByChoir = async (choir: Choir) => {
    return prisma.user.findMany({
        where: { choir },
    });
};

// Finds all users with a specific voice part.
export const findUserByVoice = async (voice: Voice) => {
    return prisma.user.findMany({
        where: { voice },
    });
};

// Finds all users with a specific group.
export const findUserByGroup = async (groupId: number) => {
    return prisma.user.findMany({
        where: {
            groups: { some: { id: groupId } },
        },
    });
}

// Assigns a role to a user (many-to-many relation).
// TODO - Create UserRole
export const assignRoleToUser = async (userId: number, roleId: number) => {
    return prisma.user.update({
        where: { id: userId },
        data: {
            roles: { connect: { id: roleId } },
        },
    });
};

// Removes a role from a user (many-to-many relation).
export const removeRoleFromUser = async (userId: number, roleId: number) => {
    return prisma.user.update({
        where: { id: userId },
        data: {
            roles: { disconnect: { id: roleId } },
        },
    });
};

// Adds a user to a group (many-to-many relation).
// TODO - Create GroupMember
export const addUserToGroup = async (userId: number, groupId: number) => {
    return prisma.user.update({
        where: { id: userId },
        data: {
            groups: { connect: { id: groupId } },
        },
    });
};

// Removes a user from a group (many-to-many relation).
export const removeUserFromGroup = async (userId: number, groupId: number) => {
    return prisma.user.update({
        where: { id: userId },
        data: {
            groups: { disconnect: { id: groupId } },
        },
    });
};