import { Context, RouterFactory } from '../interfaces/general';
import express from 'express';
import { schemaValidatorForBody } from '../middleware/validators/schemaValidatorForBody';
import AuthControllers from '../controllers/AuthControllers';
import upload from '../middleware/mutlerConfig';

export const makeAuthRouter: RouterFactory = (context: Context) => {
  const router = express.Router();
  const authControllers = new AuthControllers(context);

  router
    .route('/registration')
    .post(
      upload.single('image'),
      schemaValidatorForBody(authControllers.schemas.createnewUserSchema),
      authControllers.createNewUser,
    );

  router
    .route('/login')
    .post(
      upload.any(),
      schemaValidatorForBody(authControllers.schemas.authenticateUserSchema),
      authControllers.authenticateUser,
    );

  return router;
};
