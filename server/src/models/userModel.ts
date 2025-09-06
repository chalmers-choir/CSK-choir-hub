import { PrismaClient } from "@prisma/client";
import { RegisterInput } from "../../types";

const prisma = new PrismaClient();

export const createUser = async (
    userData: RegisterInput
) => {
    const { email, password: hashedPassword, username, firstName, lastName } = userData;
    return prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            username,
            first_name: firstName,
            last_name: lastName,
        },
    });
};

export const findUserByEmail = async (email: string) => {
    if (!email) {
        throw new Error("findUserByEmail was called without an email");
    }
    return prisma.user.findUnique({ where: { email } });
};

export const findUserByUsername = async (username: string) => {
    if (!username) {
        throw new Error("findUserByUsername was called without a username");
    }
    return prisma.user.findUnique({ where: { username } });
};

export const findUserById = async (id: number) => {
    return prisma.user.findUnique({ where: { id } });
};