import * as userModel from '@db/models/userModel';
import { generateToken } from '@utils/generateToken';
import logger from '@utils/logger';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface RegisterInput {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
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
  if (existing) throw new Error('User already exists');

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await userModel.createUser({
    ...newUser,
    password: passwordHash,
  });

  logger.info('User created', { userId: user.id });

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
export async function getUsers(filters: { groupId?: number }): Promise<any[]> {
  return userModel.getUsers(filters);
}

export async function getUser(userId: number) {
  return userModel.findByIdWithRolesAndGroups(userId);
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
  if (!token) throw new Error('No token provided');

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
