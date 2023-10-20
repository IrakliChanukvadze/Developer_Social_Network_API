import { UserService } from '../services/user.service';
import { Context } from '../interfaces/general';
import { AuthService } from '../services/auth.service';
import { FeedbackService } from '../services/feedback.service';
import { ExperienceService } from '../services/experience.service';

export const loadContext = async (): Promise<Context> => {
  return {
    services: {
      authService: new AuthService(),
      userService: new UserService(),
      experienceService: new ExperienceService(),
      feedbackService: new FeedbackService(),
    },
  };
};
