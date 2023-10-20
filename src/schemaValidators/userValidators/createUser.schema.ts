import * as joi from 'types-joi';
import { InterfaceFrom } from 'types-joi';

// Define the schema for the request body
export const createUserSchema = joi.object({
  firstName: joi.string().min(3).max(30).required(),
  lastName: joi.string().min(3).max(30).required(),
  title: joi.string().required(),
  summary: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).max(30).required(),
});

// Generate a type for the request body
export type CreateUserRequest = InterfaceFrom<typeof createUserSchema>;
