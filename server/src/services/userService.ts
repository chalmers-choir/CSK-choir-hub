import * as userModel from '../models/userModel';
import * as roleModel from '../models/roleModel';
import { Choir, Voice } from '@prisma/client';

import jwt from "jsonwebtoken";

/**
 * Create a new user after checking email and username uniqueness.
 * @param {object} userData - The user data to create.
 * @returns {Promise<object>} The created user.
 * @throws {Error} If email or username is already used.
 */
export async function createUser(userData: any): Promise<any> {
    const existingByEmail = await userModel.findUserByEmail(userData.email);
    if (existingByEmail) {
        throw new Error('Email already in use');
    }
    const existingByUsername = await userModel.findUserByUsername(userData.username);
    if (existingByUsername) {
        throw new Error('Username already in use');
    }
    return userModel.createUser(userData);
}

/**
 * Delete a user.
 * @param {string} userId - The user ID.
 * @returns {Promise<void>}
 */
export async function deleteUser(userId: number): Promise<void> {
    await userModel.deleteUser(userId);
}

/**
 * List users with optional filters for choir, voice, or role.
 * @param {object} filters - Filter options: choir, voice, role.
 * @returns {Promise<any[]>} List of users.
 */
export async function getUsers(filters: { choir?: Choir; voice?: Voice; roleId?: number; groupId?: number }): Promise<any[]> {
    return userModel.getUsers(filters);
}

/**
 * Assign a role to a user.
 * @param {string} userId - The user ID.
 * @param {string} roleName - The role to assign.
 * @returns {Promise<void>}
 */
export async function assignRole(userId: number, roleName: string): Promise<void> {
    const role = await roleModel.findRoleByName(roleName);
    if (!role) throw new Error('Role not found');
    await userModel.assignRoleToUser(userId, role.id);
}

/**
 * Remove a role from a user.
 * @param {string} userId - The user ID.
 * @param {string} roleName - The role to remove.
 * @returns {Promise<void>}
 */
export async function removeRole(userId: number, roleName: string): Promise<void> {
    const role = await roleModel.findRoleByName(roleName);
    if (!role) throw new Error('Role not found');
    await userModel.removeRoleFromUser(userId, role.id);
}

/**
 * Add a group to a user.
 * @param {string} userId - The user ID.
 * @param {string} groupId - The group ID.
 * @returns {Promise<void>}
 */
export async function addGroup(userId: number, groupId: number): Promise<void> {
    await userModel.addUserToGroup(userId, groupId);
}

/**
 * Remove a group from a user.
 * @param {string} userId - The user ID.
 * @param {string} groupId - The group ID.
 * @returns {Promise<void>}
 */
export async function removeGroup(userId: number, groupId: number): Promise<void> {
    await userModel.removeUserFromGroup(userId, groupId);
}

/**
 * Fetch all roles for a user.
 * @param {number} userId - The user ID.
 * @returns {Promise<any[]>} List of roles.
 */
export async function getUserRoles(userId: number): Promise<any[]> {
    // return userModel.getUserRoles(userId);
    return [];
}

/**
 * Fetch all groups for a user.
 * @param {number} userId - The user ID.
 * @returns {Promise<any[]>} List of groups.
 */
export async function getUserGroups(userId: number): Promise<any[]> {
    // return userModel.getUserGroups(userId);
    return []; // Placeholder until implemented
}

export const getUserIdFromToken = async (token: string) => {
    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const userId = decoded.userId;

    return userId;
};

export const getAllUsers = async () => {
    const users = await getUsers({});
    return users;
};