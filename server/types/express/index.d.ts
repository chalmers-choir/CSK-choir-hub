export interface UserPayload {
    id: number;
    email: string;
    role: string;
}

declare global {
    namespace Express {
        export interface Request {
            user?: UserPayload;
        }
    }
}