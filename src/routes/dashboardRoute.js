import { Router } from 'express';

import DashboardController from '../controllers/DashboardController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

const dashboardController = new DashboardController();

router.get('/dashboard', authMiddleware, (req, res, next) =>
  dashboardController.obterResumo(req, res, next),
);

export default router;
