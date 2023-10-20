import { UserService } from '../services/user.service';
import { createUserSchema } from '../schemaValidators/userValidators/createUser.schema';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Response, Request } from 'express';
import AppError from '../utils/appError';
import { updateUserSchema } from '../schemaValidators/userValidators/updateUser.schema';

const userServices = new UserService();

class UserControllers {
  public readonly schemas = {
    createUserSchema,
    updateUserSchema,
  };

  constructor() {}
  createNewUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const newTodo = await userServices.createNewUser(req.body);
      res.status(201).json({ status: 'success', data: newTodo });
    },
  );

  getUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      let { page, limit } = req.query;

      // Define default values for page and limit
      const defaultPage = 1;
      const defaultLimit = 10;

      // Parse page and limit as integers, use default values if not provided
      const parsedPage = page ? parseInt(page as string, 10) : defaultPage;
      const parsedLimit = limit ? parseInt(limit as string, 10) : defaultLimit;
      const users = await userServices.getUsers(parsedLimit, parsedPage);
      res.status(200).json({ users });
    },
  );

  getUserById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const user = await userServices.getUserById(id);

      if (!user) {
        return next(new AppError('User not found', 404));
      }

      res.status(200).json(user);
    },
  );

  updateUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const userData = req.body;

      const updatedUser = await userServices.updateUser(id, userData);

      if (!updatedUser) {
        return next(new AppError('User not found', 404));
      }

      res.status(200).json(updatedUser);
    },
  );

  deleteUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      await userServices.deleteUser(id);

      res.status(204).send();
    },
  );
}

export default UserControllers;
