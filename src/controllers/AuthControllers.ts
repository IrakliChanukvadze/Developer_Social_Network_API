import catchAsync from '../utils/catchAsync';
import { AuthService } from '../services/auth.service';
import { NextFunction, Request, Response } from 'express';
import { registrationSchema } from '../schemaValidators/authSchemaValidators/registration.schema';
import { loginSchema } from '../schemaValidators/authSchemaValidators/login.schema';

const authServices = new AuthService();

class AuthControllers {
  public readonly schemas = {
    createnewUserSchema: registrationSchema,
    authenticateUserSchema: loginSchema,
  };

  constructor() {}

  createNewUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const newTodo = await authServices.createNewUser(req.body, req.file);
      const { password, ...rest } = newTodo;
      res.status(201).json({ status: 'success', data: newTodo });
    },
  );

  authenticateUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await authServices.authenticateUser(req.body);

      res.status(200).json({ status: 'success', data });
    },
  );
}

export default AuthControllers;
