import { healthService } from '@services';
import { NextFunction, Request, Response } from 'express';

export const health = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = await healthService.checkHealth();
    return res.status(200).send({ status });
  } catch (error) {
    return next(error);
  }
};
