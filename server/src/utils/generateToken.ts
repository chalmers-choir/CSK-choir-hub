import jwt from "jsonwebtoken";

export const generateToken = (id: number): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};