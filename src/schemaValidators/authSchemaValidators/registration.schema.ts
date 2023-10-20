import * as joi from 'types-joi';
import { InterfaceFrom } from 'types-joi';

export const registrationSchema = joi.object({
  firstName: joi.string().min(3).max(30).required(),
  lastName: joi.string().min(3).max(30).required(),
  title: joi.string().required(),
  summary: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).max(30).required(),
  role: joi.string().valid('User', 'Admin').required(),
});

export type RegistrationRequest = InterfaceFrom<typeof registrationSchema>;
