import { Feedback, FeedbackAttributes } from '../models/feedbacks.model';
import dotenv from 'dotenv';

dotenv.config();
export class FeedbackService {
  async createFeedback(feedbackData: FeedbackAttributes) {
    console.log(feedbackData);
    const newFeedback = await Feedback.create(feedbackData);

    return newFeedback;
  }

  async getFeedbacks(page: number, pageSize: number) {
    const limit = pageSize || 10; // Default page size
    const offset = (page - 1) * limit || 0; // Calculate offset based on the page

    const feedbacks = await Feedback.findAll({
      limit,
      offset,
    });

    return feedbacks;
  }

  async getFeedbackById(id: string) {
    const feedback = await Feedback.findByPk(id);

    return feedback;
  }

  async updateFeedback(id: string, userData: any) {
    const feedbackToUpdate = await this.getFeedbackById(id);
    feedbackToUpdate.update(userData);
    await feedbackToUpdate.save();

    return feedbackToUpdate;
  }

  async deleteFeedback(id: string): Promise<void> {
    const feedbackToDelete = await this.getFeedbackById(id);

    if (!feedbackToDelete) {
      return null;
    }

    await feedbackToDelete.destroy();
  }
}
