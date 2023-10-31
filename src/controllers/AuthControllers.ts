import catchAsync from '../utils/catchAsync';
import { Request, Response } from 'express';
import { registrationSchema } from '../schemaValidators/authSchemaValidators/registration.schema';
import { loginSchema } from '../schemaValidators/authSchemaValidators/login.schema';
import { Context } from '../interfaces/general';

class AuthControllers {
  public readonly schemas = {
    createnewUserSchema: registrationSchema,
    authenticateUserSchema: loginSchema,
  };

  constructor(private context: Context) {}

  createNewUser = catchAsync(async (req: Request, res: Response) => {
    const newTodo = await this.context.services.authService.createNewUser(
      req.body,
      req.file,
    );
    res.status(201).json({ status: 'success', data: newTodo });
  });

  authenticateUser = catchAsync(async (req: Request, res: Response) => {
    const data = await this.context.services.authService.authenticateUser(
      req.body,
    );

    res.status(200).json({ status: 'success', data });
  });
}

export default AuthControllers;
