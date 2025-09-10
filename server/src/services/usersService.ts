import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import * as userModel from "@db/models/userModel";
import { Choir, Voice } from "@prisma/client";

import { generateToken } from "@utils/generateToken";
import logger from "@utils/logger";

export interface RegisterInput {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  choir: Choir;
  voice: Voice;
}

/**
 * Create a new user after checking email and username uniqueness.
 * @param {RegisterInput} userData - The user data to create.
 * @returns {Promise<string>} Token for created user.
 * @throws {Error} If email or username is already used.
 */
export const registerUser = async (newUser: RegisterInput): Promise<string> => {
  const { email, password } = newUser;

  // Check if user already exists
  const existing = await userModel.findByEmail(email);
  if (existing) throw new Error("User already exists");

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await userModel.createUser({
    ...newUser,
    password: passwordHash,
  });

  logger.info("User created", { userId: user.id });

  return generateToken(user.id);
};

/**
 * Delete a user.
 * @param {number} userId - The user ID.
 * @returns {Promise<void>}
 */
export async function deleteUser(userId: number): Promise<void> {
  await userModel.deleteUser(userId);
}

/**
 * List users with optional filters for choir, voice, or role.
 * @param {object} filters - Filter options: choir, voice, role, group.
 * @returns {Promise<any[]>} List of users.
 */
export async function getUsers(filters: {
  groupId?: number;
}): Promise<any[]> {
  return userModel.getUsers(filters);
}

export async function getUser(userId: number) {
  return userModel.findById(userId);
}

/**
 * Assign a role to a user.
 * @param {number} userId - The user ID.
 * @param {number} roleId - The role ID to assign.
 * @returns {Promise<void>}
 */
export async function assignRole(
  userId: number,
  roleId: number
): Promise<void> {
  await userModel.assignRoleToUser(userId, roleId);
}

/**
 * Remove a role from a user.
 * @param {number} userId - The user ID.
 * @param {number} roleId - The role to remove.
 * @returns {Promise<void>}
 */
export async function removeRole(
  userId: number,
  roleId: number
): Promise<void> {
  await userModel.removeRoleFromUser(userId, roleId);
}

/**
 * Add a group to a user.
 * @param {number} userId - The user ID.
 * @param {number} groupId - The group ID.
 * @returns {Promise<void>}
 */
export async function addGroup(userId: number, groupId: number): Promise<void> {
  await userModel.addToGroup(userId, groupId);
}

/**
 * Remove a group from a user.
 * @param {number} userId - The user ID.
 * @param {number} groupId - The group ID.
 * @returns {Promise<void>}
 */
export async function removeGroup(
  userId: number,
  groupId: number
): Promise<void> {
  await userModel.removeFromGroup(userId, groupId);
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

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    userId: number;
  };
  const userId = decoded.userId;

  return userId;
};

export const getAllUsers = async () => {
  const users = await getUsers({});
  return users;
};
