import express from 'express';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Feedback } from '../models/feedbacks.model';
import { Project } from '../models/projects.model';
import { Experience } from '../models/experience.model';
import { ExperienceService } from '../services/experience.service';
import { FeedbackService } from '../services/feedback.service';
import { ProjectService } from '../services/project.service';

export interface Context {
  services: {
    authService: AuthService;
    userService: UserService;
    experienceService: ExperienceService;
    feedbackService: FeedbackService;
    projectService: ProjectService;
  };
}

export type RouterFactory = (context: Context) => express.Router;

export type Loader = (app: express.Application, context: Context) => void;

export interface Models {
  user: typeof User;
  feedback: typeof Feedback;
  project: typeof Project;
  experience: typeof Experience;
}
