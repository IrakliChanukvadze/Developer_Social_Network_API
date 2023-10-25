import { Context, RouterFactory } from '../interfaces/general';
import express, { Request, Response } from 'express';
import upload from '../middleware/mutlerConfig';
import { checkAdminPermission } from '../middleware/permisionMiddlwares/checkAdminPermision';
import { verifyJWT } from '../middleware/verifyJWT';
import { schemaValidatorForBody } from '../middleware/validators/schemaValidatorForBody';
import { checkUserPermission } from '../middleware/permisionMiddlwares/checkUserPermision';
import { checkAdminOrUserPermission } from '../middleware/permisionMiddlwares/checkAdminOrUserPermision';
import FeedbackControllers from '../controllers/FeedbackControllers';

export const makeFeedbackRouter: RouterFactory = (context: Context) => {
  const feedbackControllers = new FeedbackControllers(context);
  const router = express.Router();

  router
    .route('/')
    .post(
      verifyJWT,
      checkAdminOrUserPermission,
      upload.any(),
      schemaValidatorForBody(feedbackControllers.schemas.addFeedbackSchema),
      feedbackControllers.createFeedback,
    );
  router
    .route('/')
    .get(verifyJWT, checkAdminPermission, feedbackControllers.getFeedbacks);

  router.route('/:id').get(feedbackControllers.getFeedbackById);

  router
    .route('/:id')
    .put(
      verifyJWT,
      checkUserPermission,
      upload.any(),
      feedbackControllers.updateFeedback,
    );

  router
    .route('/:id')
    .delete(
      verifyJWT,
      checkAdminOrUserPermission,
      feedbackControllers.deleteFeedback,
    );
  return router;
};
