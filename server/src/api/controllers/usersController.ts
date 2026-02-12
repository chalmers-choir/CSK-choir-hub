import * as userService from "@services/userService";
import { BadRequestError } from "@utils/errors";
import { NextFunction, Request, Response } from "express";

// Get all users
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getUsers();

    return res.json({ users });
  } catch (error) {
    return next(error);
  }
};

// Get a user by ID
export const getUserWithId = async (req: Request, res: Response, next: NextFunction) => {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) return next(new BadRequestError("Invalid user ID"));

  try {
    const user = await userService.getUser(userId);

    return res.json({ user });
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) return next(new BadRequestError("Invalid user ID"));

  const { firstName, lastName, email, dietaryPreferences } = req.body;

  try {
    const updatedUser = await userService.updateUser(userId, {
      firstName,
      lastName,
      email,
      dietaryPreferences,
    });

    return res.json({ user: updatedUser });
  } catch (error) {
    return next(error);
  }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) return next(new BadRequestError("Invalid user ID"));

  try {
    await userService.deleteUser(userId);

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
