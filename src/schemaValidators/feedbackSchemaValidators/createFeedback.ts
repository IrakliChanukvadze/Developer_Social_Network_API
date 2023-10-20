import * as joi from 'types-joi';
import { InterfaceFrom } from 'types-joi';

export const addFeedbackSchema = joi.object({
  to_user: joi.number().required(),
  company_name: joi.string().required(),
  content: joi.string().required(),
});

export type FeedbackRequest = InterfaceFrom<typeof addFeedbackSchema>;
