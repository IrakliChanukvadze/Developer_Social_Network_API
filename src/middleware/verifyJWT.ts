import catchAsync from '../utils/catchAsync';
import jwt from 'jsonwebtoken';

export const verifyJWT = catchAsync(async (req, res, next) => {
  req.user = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);

  next();
});
