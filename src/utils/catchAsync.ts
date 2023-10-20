import { NextFunction, Response, Request } from 'express';
import AppError from './appError';

type TArgFunc = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;
type TMiddleware = (req: Request, res: Response, next: NextFunction) => void;

function catchAsync(fn: TArgFunc): TMiddleware {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        const errorMessage = 'The provided email is already in use.';
        return next(new AppError(errorMessage, 400));
      }
      next(err);
    });
  };
}

export default catchAsync;
