import catchAsync from '../utils/catchAsync';
import { NextFunction, Response, Request } from 'express';
import { addFeedbackSchema } from '../schemaValidators/feedbackSchemaValidators/createFeedback';
import { FeedbackService } from '../services/feedback.service';
import { FeedbackAttributes } from '../models/feedbacks.model';
import AppError from '../utils/appError';

const feedbackService = new FeedbackService();

class FeedbackController {
  public readonly schemas = { addFeedbackSchema };

  constructor() {}
  createFeedback = async (req: Request, res: Response, next: NextFunction) => {
    const feedbackData: FeedbackAttributes = req.body;
    //@ts-ignore
    feedbackData.from_user = req.user.id;

    const newFeedback = await feedbackService.createFeedback(feedbackData);

    res.status(201).json(newFeedback);
  };

  getFeedbacks = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      let { page, pageSize } = req.query;

      // Define default values for page and pageSize
      const defaultPage = 1;
      const defaultPageSize = 10;

      // Parse page and pageSize as integers, use default values if not provided
      const parsedPage = page ? parseInt(page as string, 10) : defaultPage;
      const parsedPageSize = pageSize
        ? parseInt(pageSize as string, 10)
        : defaultPageSize;

      const feedbacks = await feedbackService.getFeedbacks(
        parsedPage,
        parsedPageSize,
      );

      res.status(200).json({ feedbacks });
    },
  );

  getFeedbackById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const feedback = await feedbackService.getFeedbackById(id);

      if (!feedback) {
        return next(new AppError('Feedback not found', 404));
      }

      res.status(200).json(feedback);
    },
  );

  updateFeedback = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const userData = req.body;

      const updatedFeedback = await feedbackService.updateFeedback(
        id,
        userData,
      );

      if (!updatedFeedback) {
        return next(new AppError('Feedback not found', 404));
      }

      res.status(200).json(updatedFeedback);
    },
  );

  deleteFeedback = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      await feedbackService.deleteFeedback(id);

      res.status(204).send();
    },
  );
}

export default FeedbackController;
