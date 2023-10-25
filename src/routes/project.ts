import { Context, RouterFactory } from '../interfaces/general';
import express, { Request, Response } from 'express';
import upload from '../middleware/mutlerConfig';
import { checkAdminPermission } from '../middleware/permisionMiddlwares/checkAdminPermision';
import { verifyJWT } from '../middleware/verifyJWT';
import { schemaValidatorForBody } from '../middleware/validators/schemaValidatorForBody';
import { checkUserPermission } from '../middleware/permisionMiddlwares/checkUserPermision';
import { checkAdminOrUserPermission } from '../middleware/permisionMiddlwares/checkAdminOrUserPermision';
import ProjectControllers from '../controllers/ProjectsControllers';

export const makeProjectRouter: RouterFactory = (context: Context) => {
  const projectControllers = new ProjectControllers(context);
  const router = express.Router();

  router
    .route('/')
    .post(
      verifyJWT,
      checkAdminOrUserPermission,
      upload.single('image'),
      schemaValidatorForBody(projectControllers.schemas.createNewProject),
      projectControllers.createProject,
    );

  router
    .route('/')
    .get(verifyJWT, checkAdminPermission, projectControllers.getProjects);

  router.route('/:id').get(projectControllers.getProjectById);
  router
    .route('/:id')
    .put(
      verifyJWT,
      checkUserPermission,
      upload.any(),
      projectControllers.updateProject,
    );
  router
    .route('/:id')
    .delete(
      verifyJWT,
      checkAdminOrUserPermission,
      projectControllers.deleteProject,
    );
  return router;
};
