import logger from "@utils/logger";
import { type NextFunction, type Request, type Response } from "express";

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  // Log the error for debugging
  logger.error(err);

  // If error has a status code, use it; otherwise, default to 500
  res.status(err.status || 500).json({
    name: err.name || "Error",
    message: err.message || "Internal Server Error",
  });
}
