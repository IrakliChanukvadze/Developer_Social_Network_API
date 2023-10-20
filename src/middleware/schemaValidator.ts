import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';

export const schemaValidator = (schema?: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!schema) next();
    const { error } = schema.validate(req.body);
    const valid = !error;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details
        .map((i: { message: string }) => i.message)
        .join(',');

      next(new AppError(message, 422));
    }
  };
};
