import { Request, Response } from "express";
import * as userService from "../services/userService";

export const profile = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const userId = await userService.getUserIdFromToken(token!);
        const profile = await userService.getUserProfile(userId);
        return res.json({ profile });
    } catch (err: any) {
        const status = err.message.includes("token") ? 401 : 500;
        return res.status(status).json({ error: err.message });
    }
};

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

        await userService.deleteUserById(userId);
        return res.status(204).send();
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
};