import { Experience } from '../models/experience.model';
import { Models } from '../interfaces/general';
import { User } from '../models/user.model';
import { Sequelize } from 'sequelize';
import { Project } from '../models/projects.model';
import { Feedback } from '../models/feedbacks.model';

export const loadModels = (sequelize: Sequelize): Models => {
  const models: Models = {
    user: User,
    experience: Experience,
    project: Project,
    feedback: Feedback,
  };

  for (const model of Object.values(models)) {
    model.defineSchema(sequelize);
  }

  for (const model of Object.values(models)) {
    model.associate(models, sequelize);
  }

  return models;
};
