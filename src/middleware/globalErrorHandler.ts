import { NextFunction, Response, Request } from "express";

type ErrorHandler = (
  err: {
    statusCode?: number;
    status?: string;
    message: string;
  },
  req: Request,
  res: Response,
  next: NextFunction
) => void;

const errorHandler: ErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({ status: err.status, message: err.message });
};

export default errorHandler;
