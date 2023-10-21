import { Context, RouterFactory } from '../interfaces/general';
import express, { Request, Response } from 'express';
import { schemaValidator } from '../middleware/schemaValidator';
import AuthControllers from '../controllers/AuthControllers';
import upload from '../middleware/mutlerConfig';

export const makeAuthRouter: RouterFactory = (context: Context) => {
  const router = express.Router();
  const authControllers = new AuthControllers(context);

  router
    .route('/registration')
    .post(
      upload.single('image'),
      schemaValidator(authControllers.schemas.createnewUserSchema),
      authControllers.createNewUser,
    );

  router
    .route('/login')
    .post(
      upload.any(),
      schemaValidator(authControllers.schemas.authenticateUserSchema),
      authControllers.authenticateUser,
    );

  return router;
};
