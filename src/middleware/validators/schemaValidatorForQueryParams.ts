import { NextFunction, Request, Response } from 'express';
import AppError from '../../utils/appError';

export function validateQueryParameters(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const allowedParameters = ['page', 'limit'];
  const invalidParameters = [];
  for (const param in req.query) {
    if (!allowedParameters.includes(param)) {
      invalidParameters.push(param);
    }
  }
  if (invalidParameters.length > 0) {
    const errorMessage = `Invalid query params`;
    return next(new AppError(errorMessage, 403));
  }
  next();
}
