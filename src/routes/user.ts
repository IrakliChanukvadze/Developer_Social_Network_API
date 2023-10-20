import { Context, RouterFactory } from '../interfaces/general';
import express, { Request, Response } from 'express';
import upload from '../middleware/mutlerConfig';
import { checkAdminPermission } from '../middleware/permisionMiddlwares/checkAdminPermision';
import { verifyJWT } from '../middleware/verifyJWT';
import UserControllers from '../controllers/UserControllers';
import { schemaValidator } from '../middleware/schemaValidator';
import { checkUserPermission } from '../middleware/permisionMiddlwares/checkUserPermision';
import { checkAdminOrUserPermission } from '../middleware/permisionMiddlwares/checkAdminOrUserPermision';
const userControllers = new UserControllers();

export const makeUserRouter: RouterFactory = (context: Context) => {
  const router = express.Router();

  router
    .route('/')
    .post(
      verifyJWT,
      checkAdminPermission,
      upload.any(),
      schemaValidator(userControllers.schemas.createUserSchema),
      userControllers.createNewUser,
    );

  router
    .route('/')
    .get(verifyJWT, checkAdminPermission, userControllers.getUsers);

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
