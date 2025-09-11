export interface UserPayload {
  id: number;
  groups: string[];
  roles: string[];
}

declare global {
  namespace Express {
    export interface Request {
      user?: UserPayload;
    }
  }
}
