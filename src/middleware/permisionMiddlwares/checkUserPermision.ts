import { NextFunction,  Response } from 'express';
import { User } from '../../models/user.model';
import AppError from '../../utils/appError';
import { IRequestWithUser } from './checkAdminOrUserPermision';

export const checkUserPermission = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const userFromBase = await User.findOne({
    
    where: { email: req?.user.email },
  });
  const permision = userFromBase.email === req?.user.email;

  if (permision) {
    next();
  } else {
    next(new AppError('Sorry you dont have permission', 400));
  }
};
