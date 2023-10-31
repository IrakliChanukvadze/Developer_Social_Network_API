import { Loader } from '../interfaces/general';
import express from 'express';
import requestID from 'express-request-id';
import { logRequestInfo } from '../middleware/logRequestInfo';

export const loadMiddlewares: Loader = (app) => {
  app.use(express.json(), requestID(), logRequestInfo);
};
