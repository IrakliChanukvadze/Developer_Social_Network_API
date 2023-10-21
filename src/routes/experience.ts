import { Context, RouterFactory } from '../interfaces/general';
import express, { Request, Response } from 'express';
import upload from '../middleware/mutlerConfig';
import { checkAdminPermission } from '../middleware/permisionMiddlwares/checkAdminPermision';
import { verifyJWT } from '../middleware/verifyJWT';
import { schemaValidator } from '../middleware/schemaValidator';
import { checkUserPermission } from '../middleware/permisionMiddlwares/checkUserPermision';
import { checkAdminOrUserPermission } from '../middleware/permisionMiddlwares/checkAdminOrUserPermision';
import ExperienceController from '../controllers/ExperienceControllers';

export const makeExperienceRouter: RouterFactory = (context: Context) => {
  const experienceController = new ExperienceController(context);
  const router = express.Router();

  router
    .route('/')
    .post(
      verifyJWT,
      checkAdminOrUserPermission,
      upload.any(),
      schemaValidator(experienceController.schemas.addExperienceSchema),
      experienceController.createExperience,
    );
  router
    .route('/')
    .get(verifyJWT, checkAdminPermission, experienceController.getExperiences);

  router.route('/:id').get(experienceController.getExperienceById);

  router
    .route('/:id')
    .put(
      verifyJWT,
      checkUserPermission,
      upload.any(),
      experienceController.updateExperience,
    );

  router
    .route('/:id')
    .delete(
      verifyJWT,
      checkAdminOrUserPermission,
      experienceController.deleteExperience,
    );
  return router;
};
