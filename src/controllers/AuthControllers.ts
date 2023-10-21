import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import { registrationSchema } from '../schemaValidators/authSchemaValidators/registration.schema';
import { loginSchema } from '../schemaValidators/authSchemaValidators/login.schema';
import { Context } from '../interfaces/general';
import { logger } from '../libs/logger';

class AuthControllers {
  public readonly schemas = {
    createnewUserSchema: registrationSchema,
    authenticateUserSchema: loginSchema,
  };

  constructor(private context: Context) {}

  createNewUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const newTodo = await this.context.services.authService.createNewUser(
        req.body,
        req.file,
      );
      const { password, ...rest } = newTodo;
      res.status(201).json({ status: 'success', data: newTodo });
    },
  );

  authenticateUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await this.context.services.authService.authenticateUser(
        req.body,
      );

      res.status(200).json({ status: 'success', data });
    },
  );
}

export default AuthControllers;
