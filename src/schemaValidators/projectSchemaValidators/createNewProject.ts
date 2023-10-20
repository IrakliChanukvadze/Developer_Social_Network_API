import * as joi from 'types-joi';
import { InterfaceFrom } from 'types-joi';

export const createNewProject = joi.object({
  // image: joi.string().required(),
  description: joi.string().required(),
});

export type ProjectRequest = InterfaceFrom<typeof createNewProject>;
