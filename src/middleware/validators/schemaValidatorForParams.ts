import { NextFunction, Request, Response } from 'express';
import AppError from '../../utils/appError';
import { User } from '../../models/user.model';
import { Feedback } from '../../models/feedbacks.model';
import { Project } from '../../models/projects.model';
import { Experience } from '../../models/experience.model';
import { logger } from '../../libs/logger';

export const schemaValidatorForParams = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    logger.info(id);
    const regex = /^[0-9]+$/;
    if (!regex.test(id)) {
      const errorMessage = `Invalid ID ${id}, only numbers are allowed`;
      return next(new AppError(errorMessage, 403));
    }
    next();
  };
};
