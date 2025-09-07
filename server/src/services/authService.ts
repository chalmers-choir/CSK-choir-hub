import bcrypt from "bcryptjs";
import { createUser, findUserByEmail, findUserByUsername } from "../models/userModel";
import { generateToken } from "../utils/generateToken";
import { RegisterInput } from "../../types";

export const registerUser = async (newUser: RegisterInput): Promise<string> => {
    const { email, password } = newUser;

    // Check if user already exists
    const existing = await findUserByEmail(email);
    if (existing) throw new Error("User already exists");


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ ...newUser, password: hashedPassword });

    return generateToken(user.id);
};

interface LoginInput {
    identifier: string; // email or username
    type: "email" | "username";
    password: string;
}

export const loginUser = async ({ identifier, type, password }: LoginInput) => {
    const user =
        type === "email"
            ? await findUserByEmail(identifier)
            : await findUserByUsername(identifier);

    if (!user) {
        throw new Error("User not found");
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        throw new Error("Invalid password");
    }

    return generateToken(user.id);
};