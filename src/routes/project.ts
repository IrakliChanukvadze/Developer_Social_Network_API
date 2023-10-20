import { Context, RouterFactory } from '../interfaces/general';
import express, { Request, Response } from 'express';
import upload from '../middleware/mutlerConfig';
import { checkAdminPermission } from '../middleware/permisionMiddlwares/checkAdminPermision';
import { verifyJWT } from '../middleware/verifyJWT';
import { schemaValidator } from '../middleware/schemaValidator';
import { checkUserPermission } from '../middleware/permisionMiddlwares/checkUserPermision';
import { checkAdminOrUserPermission } from '../middleware/permisionMiddlwares/checkAdminOrUserPermision';
import ProjectControllers from '../controllers/ProjectsControllers';
const projectControllers = new ProjectControllers();

export const makeProjectRouter: RouterFactory = (context: Context) => {
  const router = express.Router();

  router
    .route('/')
    .post(
      verifyJWT,
      checkAdminOrUserPermission,
      upload.single('image'),
      schemaValidator(projectControllers.schemas.createNewProject),
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