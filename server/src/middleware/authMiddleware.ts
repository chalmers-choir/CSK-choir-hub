import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as userModel from "@db/models/userModel";
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

/**
 * Middleware to protect routes and check user roles.
 * @param allowedRoles - Array of roles allowed to access the route.
 */
export const requireAuth = (allowedRoles?: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        try {
            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            const user = await userModel.findByIdWithRoles(decoded.id);

            if (!user) {
                return res.status(401).json({ success: false, message: "User not found" });
            }

            req.user = { id: user.id, email: user.email, roles: user.roles.map((role: Role) => role.name) };

            // Check roles if allowedRoles is provided
            if (
                allowedRoles &&
                allowedRoles.length > 0 &&
                !req.user.roles.some((role) => allowedRoles.includes(role))
            ) {
                return res.status(403).json({ success: false, message: "Forbidden: Access denied." });
            }

            return next();
        } catch (err) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
    };
};