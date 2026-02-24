import { prisma } from "@db";
import * as userModel from "@db/models/userModel";
import { User } from "@prisma/generated/client";
import { NotFoundError, UnauthorizedError } from "@utils";
import { generateToken } from "@utils/generateToken";
import logger from "@utils/logger";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
  const { email, username, password } = newUser;

  // Check if user already exists
  const emailExists = await userModel.findByEmail(email);

  if (emailExists) throw new Error("User with this email already exists");

  const usernameExists = await userModel.findByUsername(username);

  if (usernameExists) throw new Error("Username already taken");

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
 * @param {object} filters - Filter options: group.
 * @returns {Promise<any[]>} List of users.
 */
export async function getUsers(
  filters?: { groupId?: number },
  include?: { roles?: boolean; groups?: boolean },
) {
  return userModel.getUsers(filters, include);
}

export async function getUser(userId: number) {
  return userModel.findById(userId, { roles: true, groups: true });
}

export const getUserIdFromToken = async (token: string) => {
  if (!token) throw new Error("No token provided");

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    userId: number;
  };

  const userId = decoded.userId;

  return userId;
};

export const getUserFromToken = async (token: string) => {
  if (!token) throw new UnauthorizedError("No token provided");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
    };
    const userId = decoded.userId;
    const user = await userModel.findById(userId, { roles: true, groups: true });

    if (!user) throw new NotFoundError("User not found");

    const { passwordHash, ...userWithoutPWHash } = user;

    return userWithoutPWHash;
  } catch (err) {
    throw new UnauthorizedError("Invalid token");
  }
};

/**
 * Update user information and group memberships.
 * @param {number} userId - The user ID.
 * @param {Partial<User>} updateData - The user fields to update.
 * @param {number[]} [groupIds] - Optional array of group IDs to set for the user.
 * @returns {Promise<User>} The updated user.
 * @throws {Error} If email is already in use by another account.
 */
export const updateUser = async (
  userId: number,
  updateData: Partial<User>,
  groupIds?: number[],
) => {
  const { email } = updateData;

  if (email) {
    const existingUser = await userModel.findByEmail(email);

    if (existingUser && existingUser.id !== userId) {
      throw new Error("Email already in use by another account");
    }
  }

  // Update basic user fields
  const updatedUser = await userModel.updateUser(userId, updateData);

  // Sync group memberships if groupIds provided
  if (groupIds !== undefined) {
    // Get current groups
    const currentGroups = await prisma.group.findMany({
      where: { members: { some: { id: userId } } },
      select: { id: true },
    });

    const currentGroupIds = currentGroups.map((g) => g.id);
    const groupIdsToAdd = groupIds.filter((id) => !currentGroupIds.includes(id));
    const groupIdsToRemove = currentGroupIds.filter((id) => !groupIds.includes(id));

    // Add user to new groups
    for (const groupId of groupIdsToAdd) {
      await prisma.group.update({
        where: { id: groupId },
        data: { members: { connect: { id: userId } } },
      });
    }

    // Remove user from old groups
    for (const groupId of groupIdsToRemove) {
      await prisma.group.update({
        where: { id: groupId },
        data: { members: { disconnect: { id: userId } } },
      });
    }
  }

  return updatedUser;
};

/**
 * Get all groups a user belongs to, including inherited groups through parent hierarchy.
 * @param {number} userId - The user ID.
 * @returns {Promise<Array>} Array of groups with id, name, and type.
 */
export const getUserAllGroups = async (userId: number) => {
  // Get direct group memberships
  const directGroups = await prisma.group.findMany({
    where: { members: { some: { id: userId } } },
  });

  const roles = await userModel.findRolesByUser(userId);
  const roleGroups = await prisma.group.findMany({
    where: { roles: { some: { id: { in: roles.map((r) => r.id) } } } },
  });

  // Recursively get all parent groups
  const allGroupIds = new Set<number>();
  const visited = new Set<number>();

  const collectAncestors = async (groupId: number) => {
    if (visited.has(groupId)) return;
    visited.add(groupId);
    allGroupIds.add(groupId);

    const parents = await prisma.group.findMany({
      where: { children: { some: { id: groupId } } },
      select: { id: true },
    });

    for (const parent of parents) {
      await collectAncestors(parent.id);
    }
  };

  // Collect all ancestors for each direct group
  for (const group of directGroups) {
    await collectAncestors(group.id);
  }

  for (const group of roleGroups) {
    await collectAncestors(group.id);
  }

  // Fetch group summaries for all collected groups
  const allGroups = await prisma.group.findMany({
    where: { id: { in: Array.from(allGroupIds) } },
  });

  return allGroups;
};
