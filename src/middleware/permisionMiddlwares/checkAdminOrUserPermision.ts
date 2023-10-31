import { NextFunction, Request, Response } from 'express';
import { User } from '../../models/user.model';
import AppError from '../../utils/appError';

export interface IRequestWithUser extends Request {
  user: {
    email: string,
    id: number
  }
}

export const checkAdminOrUserPermission = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const userFromBase = await User.findOne({
    
    where: { email: req?.user.email },
  });

  const permision = 
    userFromBase.role === 'Admin' || userFromBase.email === req.user.email;

  if (permision) {
    next();
  } else {
    next(new AppError('Sorry you dont have permission', 400));
  }
};
