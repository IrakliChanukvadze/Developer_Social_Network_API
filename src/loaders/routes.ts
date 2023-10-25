import express from 'express';
import { Context } from '../interfaces/general';
import { makeAuthRouter } from '../routes/auth';
import globalErrorHandler from '../middleware/globalErrorHandler';
import AppError from '../utils/appError';
import { makeUserRouter } from '../routes/user';
import { makeExperienceRouter } from '../routes/experience';
import { makeFeedbackRouter } from '../routes/feedback';
import { makeProjectRouter } from '../routes/project';

export const loadRoutes = (app: express.Router, context: Context) => {
  app.use('/api/auth', makeAuthRouter(context));
  app.use('/api/users', makeUserRouter(context));
  app.use('/api/experience', makeExperienceRouter(context));
  app.use('/api/feedback', makeFeedbackRouter(context));
  app.use('/api/project', makeProjectRouter(context));

  app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
  });

  app.use(globalErrorHandler);
};
