import { Request, Response } from "express";
import * as healthService from "../services/healthService";

export const health = async (req: Request, res: Response) => {
    try {
        const status = await healthService.checkHealth();
        return res.status(200).json({ status });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};