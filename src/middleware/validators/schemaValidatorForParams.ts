import { NextFunction, Request, Response } from 'express';
import AppError from '../../utils/appError';
import { User } from '../../models/user.model';
import { Feedback } from '../../models/feedbacks.model';
import { Project } from '../../models/projects.model';
import { Experience } from '../../models/experience.model';
import { logger } from '../../libs/logger';

type ModelType =
  | typeof User
  | typeof Feedback
  | typeof Project
  | typeof Experience;

type ModelNames = 'User' | 'Experience' | 'Project' | 'Feedback';

export const schemaValidatorForParams = (
  model: ModelType,
  modelName: ModelNames,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    logger.info(id);
    const regex = /^[0-9]+$/;
    if (!regex.test(id)) {
      const errorMessage = `Invalid ID ${id}, only numbers are allowed`;
      return next(new AppError(errorMessage, 403));
    }
    //@ts-ignore
    const data = await model.findByPk(id);
    if (data) {
      next();
    }
    const errorMessage = `${modelName} with provided ID: ${id} does not exists`;

    return next(new AppError(errorMessage, 404));
  };
};
