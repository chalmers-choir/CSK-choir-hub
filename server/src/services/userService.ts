import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import jwt from "jsonwebtoken";

const userProfile = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            username: true,
            email: true,
            first_name: true,
            last_name: true,
            role: true,
            created_at: true,
            updated_at: true
        }
    });
    return user;
};

export const getUserIdFromToken = async (token: string) => {
    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const userId = decoded.userId;

    return userId;
};

export const getUserProfile = async (userId: number) => {
    const profile = await userProfile(userId);
    if (!profile) throw new Error("User not found");
    return profile;
}

export const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            email: true,
            first_name: true,
            last_name: true,
            role: true,
            created_at: true,
            updated_at: true
        }
    });
    return users;
};

export const deleteUserById = async (id: number) => {
    const deleted = await prisma.user.delete({ where: { id } });
    return deleted;
};