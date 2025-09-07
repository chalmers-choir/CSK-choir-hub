import { Request, Response } from "express";
import * as authService from "../services/authService";

import { z } from 'zod';

export const register = async (req: Request, res: Response) => {
    const registerSchema = z.object({
        email: z.email(),
        username: z.string().min(3),
        password: z.string().min(6),
    });

    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ errors: z.treeifyError(result.error) });
    }

    const { email, password, username, first_name, last_name, voice, choir } = req.body;

    try {
        const token = await authService.registerUser({
            email,
            password,
            username,
            firstName: first_name,
            lastName: last_name,
            voice,
            choir
        });
        return res.status(201).json({ token });
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        // extract username/email and password from request body
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username/email and password are required" });
        }

        // Determine if input is an email
        const isEmail = username.includes("@");

        // Call the login service to get token
        // token -> authenticator
        const token = await authService.loginUser({
            identifier: username,
            type: isEmail ? "email" : "username",
            password,
        });

        return res.json({ token });
    } catch (err: any) {
        return res.status(401).json({ error: err.message });
    }
};