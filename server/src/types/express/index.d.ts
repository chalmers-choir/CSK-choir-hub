import { Role } from "@prisma/client";

export interface UserPayload {
    id: number;
    email: string;
    role: Role;
}

declare global {
    namespace Express {
        export interface Request {
            user?: UserPayload;
        }
    }
}