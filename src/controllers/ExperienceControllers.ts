import catchAsync from '../utils/catchAsync';
import { NextFunction, Response, Request } from 'express';
import AppError from '../utils/appError';
import { addExperienceSchema } from '../schemaValidators/experienceSchemaValidators/addExperienceSchema';
import { ExperienceService } from '../services/experience.service';
import { ExperienceAttributes } from '../models/experience.model';
const experienceService = new ExperienceService();

class ExperienceController {
  public readonly schemas = { addExperienceSchema };

  constructor() {}
  createExperience = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const experienceData: ExperienceAttributes = req.body;
      if (!experienceData.user_id) {
        //@ts-ignore
        experienceData.user_id = req.user.id;
      }
      const newExperience =
        await experienceService.createExperience(experienceData);

      res.status(201).json(newExperience);
    },
  );
  getExperiences = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      let { page, limit } = req.query;

      // Define default values for page and limit
      const defaultPage = 1;
      const defaultLimit = 10;

      // Parse page and limit as integers, use default values if not provided
      const parsedPage = page ? parseInt(page as string, 10) : defaultPage;
      const parsedLimit = limit ? parseInt(limit as string, 10) : defaultLimit;
      const experience = await experienceService.getExperiences(
        parsedLimit,
        parsedPage,
      );
      res.status(200).json({ experience });
    },
  );

  getExperienceById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const user = await experienceService.getExperienceById(id);

      if (!user) {
        return next(new AppError('User not found', 404));
      }

      res.status(200).json(user);
    },
  );

  updateExperience = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const userData = req.body;

      const updatedUser = await experienceService.updateExperience(
        id,
        userData,
      );

      if (!updatedUser) {
        return next(new AppError('User not found', 404));
      }

      res.status(200).json(updatedUser);
    },
  );

  deleteExperience = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      await experienceService.deleteExperience(id);

      res.status(204).send();
    },
  );
}

export default ExperienceController;
