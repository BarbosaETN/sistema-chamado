import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';

const authController = new AuthController();
const router = Router();

router.post('/auth/login', (req, res, next) => authController.login(req, res, next));

export default router;