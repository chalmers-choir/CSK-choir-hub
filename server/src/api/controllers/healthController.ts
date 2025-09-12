import { healthService } from '@services';
import { Request, Response } from 'express';

export const health = async (req: Request, res: Response) => {
  const status = await healthService.checkHealth();
  return res.status(200).send({ status });
};
