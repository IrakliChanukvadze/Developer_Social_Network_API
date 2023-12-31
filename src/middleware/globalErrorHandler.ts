import { NextFunction, Response, Request } from 'express';
import { logger } from '../libs/logger';

type ErrorHandler = (
  err: {
    statusCode?: number;
    status?: string;
    message: string;
  },
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorHandler = (err, req, res, next) => {
  const id = (req as any).id;
  logger.error(`request id: ${id}, An error occurred: ${err.message}`);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({ status: err.status, message: err.message });
};

export default errorHandler;
