import catchAsync from '../utils/catchAsync';
import { NextFunction, Response, Request } from 'express';
import { addFeedbackSchema } from '../schemaValidators/feedbackSchemaValidators/createFeedback';
import { FeedbackAttributes } from '../models/feedbacks.model';
import { Context } from '../interfaces/general';
import AppError from '../utils/appError';
import { logger } from '../libs/logger';

class FeedbackController {
  public readonly schemas = { addFeedbackSchema };

  constructor(private context: Context) {}
  createFeedback = async (req: Request, res: Response, next: NextFunction) => {
    const feedbackData: FeedbackAttributes = req.body;
    //@ts-ignore
    feedbackData.from_user = req?.user?.id;
    const newFeedback =
      await this.context.services.feedbackService.createFeedback(feedbackData);

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

      const feedbacks =
        await this.context.services.feedbackService.getFeedbacks(
          parsedPage,
          parsedPageSize,
        );

      res.status(200).json({ feedbacks });
    },
  );

  getFeedbackById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const feedback =
        await this.context.services.feedbackService.getFeedbackById(id);

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

      const updatedFeedback =
        await this.context.services.feedbackService.updateFeedback(
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

      await this.context.services.feedbackService.deleteFeedback(id);

      res.status(204).send();
    },
  );
}

export default FeedbackController;
