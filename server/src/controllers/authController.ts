import { Request, Response } from "express";
import * as authService from "../services/authService";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, username, first_name, last_name } = req.body;
        const token = await authService.registerUser({
            email,
            password,
            username,
            firstName: first_name,
            lastName: last_name
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