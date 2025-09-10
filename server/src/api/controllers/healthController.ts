import { Request, Response } from "express";

export const healthHandler = async (req: Request, res: Response) => {
    return res.status(200);
};