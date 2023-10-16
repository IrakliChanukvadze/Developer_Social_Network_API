import { Context, RouterFactory } from '../interfaces/general';
import express, { Request, Response } from 'express';

export const makeAuthRouter: RouterFactory = (context: Context) => {
  const router = express.Router();

  // Define routes
  router.route('/').get((req: Request, res: Response) => {
    res.status(201).json({ status: 'success', data: 'data' });
  });

  return router;
};
