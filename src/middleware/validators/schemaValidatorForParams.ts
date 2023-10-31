import { NextFunction, Request, Response } from 'express';
import AppError from '../../utils/appError';
import { logger } from '../../libs/logger';

export const schemaValidatorForParams = async (req: Request, res: Response, next: NextFunction) => {
  
    const { id } = req.params;
    logger.info(id);
    const regex = /^[0-9]+$/;
    if (!regex.test(id)) {
      const errorMessage = `Invalid ID ${id}, only numbers are allowed`;
      return next(new AppError(errorMessage, 403));
    }
    next();
  
};
