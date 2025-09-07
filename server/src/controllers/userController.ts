import { Request, Response } from "express";
import * as userService from "../services/userService";

export const users = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.json({ users });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) return res.status(400).json({ error: "Invalid user ID" });

        await userService.deleteUser(userId);
        return res.status(204).send();
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};