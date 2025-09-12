import { NextFunction, Request, Response } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  res.status(err.status || 500).json({
    name: err.name || 'Error',
    message: err.message || 'Internal Server Error',
  });
}
