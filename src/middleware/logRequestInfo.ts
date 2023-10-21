import { NextFunction, Request, Response } from 'express';
import { logger } from '../libs/logger';

export const logRequestInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = (req as any).id;
  logger.info(`request reseved with ${id}`);
  logger.info(`request reseved at:  ${req.originalUrl}`);
  logger.info(`request reseved with method: ${req.method}`);

  next();
};
