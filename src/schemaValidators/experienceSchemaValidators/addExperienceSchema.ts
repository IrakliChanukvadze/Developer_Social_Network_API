import * as joi from 'types-joi';
import { InterfaceFrom } from 'types-joi';

export const addExperienceSchema = joi.object({
  userId: joi.number(),
  company_name: joi.string().required(),
  role: joi.string().required(),
  startDate: joi.date().required(),
  endDate: joi.date().required(),
  description: joi.string().required(),
});

export type ExperienceRequest = InterfaceFrom<typeof addExperienceSchema>;
