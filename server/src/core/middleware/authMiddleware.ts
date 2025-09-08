import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { findUserByIdWithRoles } from "@db/models/userModel";
import { Role } from "@prisma/client";

interface JwtPayload {
    id: number;
}

declare module "express-serve-static-core" {
    interface Request {
        user?: {
            id: number;
            email: string;
            roles: string[];
        };
    }
}

// Todo: does not currently check roles
export const requireAuth = (allowedRoles?: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        try {
            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            const user = await findUserByIdWithRoles(decoded.id);

            if (!user) {
                return res.status(401).json({ success: false, message: "User not found" });
            }

            req.user = { id: user.id, email: user.email, roles: user.roles.map((role: Role) => role.name) };
            return next();
        } catch (err) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
    };
};