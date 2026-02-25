import { userModel } from "@db";
import { type Group, type Role } from "@prisma/generated/client";
import { ForbiddenError, UnauthorizedError } from "@utils";
import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: number;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: number;
      roles: string[];
      groups: string[];
    };
  }
}

interface AccessRules {
  roles?: string[];
  groups?: string[];
  allowSelf?: boolean;
  paramKey?: string; // e.g. "userId" if route has /users/:userId
}

/**
 * Middleware to protect routes and check user roles.
 * @param allowedRoles - Array of roles allowed to access the route.
 */
export const requireAuth = (rules?: AccessRules) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearer = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : undefined;
      const token = req.cookies?.token ?? bearer;

      if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      const user = await userModel.findById(decoded.userId, { roles: true, groups: true });

      if (!user) {
        return next(new UnauthorizedError("User not found"));
      }

      req.user = {
        id: user.id,
        roles: user.roles.map((role: Role) => role.name),
        groups: user.groups.map((group: Group) => group.name),
      };

      // Role check
      if (rules?.roles?.length && !req.user.roles.some((r) => rules.roles!.includes(r))) {
        return next(new ForbiddenError("Forbidden: Role not allowed."));
      }

      // Group check
      if (rules?.groups?.length && !req.user.groups.some((g) => rules.groups!.includes(g))) {
        return next(new ForbiddenError("Forbidden: Group not allowed."));
      }

      // Self check
      if (rules?.allowSelf && rules.paramKey) {
        const targetId = parseInt(req.params[rules.paramKey], 10);

        if (req.user.id !== targetId) {
          return next(new ForbiddenError("Forbidden: Not your resource."));
        }
      }

      return next();
    } catch (err) {
      console.log(err);

      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  };
};
