import { createUserSchema } from '../schemaValidators/userValidators/createUser.schema';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Response, Request } from 'express';
import AppError from '../utils/appError';
import { Context } from '../interfaces/general';
import { updateUserSchema } from '../schemaValidators/userValidators/updateUser.schema';
import { CacheService } from '../services/cache.service';
import { logger } from '../libs/logger';

class UserControllers {
  public readonly schemas = {
    createUserSchema,
    updateUserSchema,
  };

  constructor(private context: Context) {}
  createNewUser = catchAsync(async (req: Request, res: Response) => {
    const newTodo = await this.context.services.userService.createNewUser(
      req.body,
    );
    res.status(201).json({ status: 'success', data: newTodo });
  });

  getUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      let { page, limit } = req.query;

      // Define default values for page and limit
      const defaultPage = 1;
      const defaultLimit = 10;

      // Parse page and limit as integers, use default values if not provided
      const parsedPage = page ? parseInt(page as string, 10) : defaultPage;
      const parsedLimit = limit ? parseInt(limit as string, 10) : defaultLimit;
      const users = await this.context.services.userService.getUsers(
        parsedLimit,
        parsedPage,
      );
      res.status(200).json({ users });
    },
  );

  getUserById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const user = await this.context.services.userService.getUserById(id);

      if (!user) {
        return next(new AppError('User not found', 404));
      }

      res.status(200).json(user);
    },
  );

  getUserCV = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const cache = new CacheService();
      const cachedCV = await cache.getFromCache(parseInt(id));
      console.log(cachedCV, 'cached CV -----------------------');
      if (cachedCV) {
        logger.info(`CV with id: ${id}, was taken from redis`);
        res.status(200).json({ status: 'resultesdd', cachedCV });
      } else {
        const result = await this.context.services.userService.getUserCV(id);
        logger.info(
          `CV with id: ${id}, wasnt in redis, so created from DB and saved to redis`,
        );
        cache.saveToCache(parseInt(id), result);
        res.status(200).json({ status: 'resultesdd', result });
      }
    },
  );

  updateUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const userData = req.body;

      const updatedUser = await this.context.services.userService.updateUser(
        id,
        userData,
      );

      if (!updatedUser) {
        return next(new AppError('User not found', 404));
      }

      res.status(200).json(updatedUser);
    },
  );

  deleteUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      await this.context.services.userService.deleteUser(id);

      res.status(204).send();
    },
  );
}

export default UserControllers;
