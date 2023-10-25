import { Context, RouterFactory } from '../interfaces/general';
import express, { Request, Response } from 'express';
import upload from '../middleware/mutlerConfig';
import { checkAdminPermission } from '../middleware/permisionMiddlwares/checkAdminPermision';
import { verifyJWT } from '../middleware/verifyJWT';
import UserControllers from '../controllers/UserControllers';
import { schemaValidatorForBody } from '../middleware/validators/schemaValidatorForBody';
import { checkUserPermission } from '../middleware/permisionMiddlwares/checkUserPermision';
import { checkAdminOrUserPermission } from '../middleware/permisionMiddlwares/checkAdminOrUserPermision';
import { schemaValidatorForParams } from '../middleware/validators/schemaValidatorForParams';

export const makeUserRouter: RouterFactory = (context: Context) => {
  const userControllers = new UserControllers(context);
  const router = express.Router();

  router
    .route('/')
    .post(
      verifyJWT,
      checkAdminPermission,
      upload.any(),
      schemaValidatorForBody(userControllers.schemas.createUserSchema),
      userControllers.createNewUser,
    );

  router
    .route('/')
    .get(verifyJWT, checkAdminPermission, userControllers.getUsers);

  router.route('/:id/cv').get(userControllers.getUserCV);
  router.route('/:id').get(userControllers.getUserById);
  router
    .route('/:id')
    .put(
      verifyJWT,
      checkUserPermission,
      upload.single('image'),
      userControllers.updateUser,
    );

  router
    .route('/:id')
    .delete(verifyJWT, checkAdminOrUserPermission, userControllers.deleteUser);

  return router;
};
