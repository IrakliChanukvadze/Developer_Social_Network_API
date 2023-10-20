import { NextFunction, Request, Response } from 'express';
import { User } from '../../models/user.model';
import AppError from '../../utils/appError';

export const checkUserPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userFromBase = await User.findOne({
    //@ts-ignore
    where: { email: req?.user.email },
  });
  //@ts-ignore
  const permision = userFromBase.email === req?.user.email;

  if (permision) {
    next();
  } else {
    next(new AppError('Sorry you dont have permission', 400));
  }
};
