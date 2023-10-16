import express from 'express';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Feedback } from '../models/feedbacks.model';
import { Project } from '../models/projects.model';
import { Experience } from '../models/experience.model';

export interface Context {
  services: {
    authService: AuthService;
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
