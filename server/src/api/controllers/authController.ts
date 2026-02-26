import * as authService from "@services/authService";
import * as userService from "@services/userService";
import { BadRequestError, UnauthorizedError } from "@utils";
import { type NextFunction, type Request, type Response } from "express";
import { z } from "zod";

type CookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "strict" | "lax" | "none";
  path: string;
};

const CROSS_SITE_COOKIES = process.env.CROSS_SITE_COOKIES === "true";
const isProduction = process.env.NODE_ENV === "production";

const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: isProduction || CROSS_SITE_COOKIES,
  sameSite: CROSS_SITE_COOKIES ? "none" : "lax",
  path: "/",
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Rules for Registration in frontend
  const registerSchema = z.object({
    email: z.email(),
    username: z.string().min(3),
    password: z.string().min(6),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  });

  const result = registerSchema.safeParse(req.body);

  if (!result.success) return next(new BadRequestError("Invalid registration data"));

  const { email, password, username, firstName, lastName } = req.body;

  try {
    const token = await userService.registerUser({
      email,
      password,
      username,
      firstName,
      lastName,
    });

    return res.status(201).json({ token });
  } catch (error: any) {
    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username || !password)
    return next(new BadRequestError("Username / email and password are required"));

  // Determine if input is an email using zod
  const isEmail = z.email().safeParse(username).success;

  try {
    // Call the login service to get token
    const token = await authService.loginUser({
      identifier: username,
      type: isEmail ? "email" : "username",
      password,
    });

    res.clearCookie("token", COOKIE_OPTIONS);
    res.cookie("token", token, { ...COOKIE_OPTIONS, maxAge: 24 * 60 * 60 * 1000 });

    const user = await userService.getUserFromToken(token);

    return res.json({ user });
  } catch (error: any) {
    return next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token", COOKIE_OPTIONS);

    return res.sendStatus(200);
  } catch (error: any) {
    return next(error);
  }
};

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) return next(new UnauthorizedError("Not authenticated"));

  try {
    const user = await userService.getUserFromToken(token);
    const groups = await userService.getUserAllGroups(user.id);

    user.groups = groups;

    return res.json({ user });
  } catch (error: any) {
    return next(error);
  }
};
