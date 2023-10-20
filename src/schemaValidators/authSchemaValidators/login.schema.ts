import * as joi from 'types-joi';
import { InterfaceFrom } from 'types-joi';

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(3).max(30).required(),
});

export type LoginRequest = InterfaceFrom<typeof loginSchema>;
