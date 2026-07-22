import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import HistoricoChamadoController from '../controllers/HistoricoChamadoController.js';

const router = Router();

const historicoController = new HistoricoChamadoController();

router.get(
  '/chamados/:id/historico',
  authMiddleware,
  (req, res, next) => historicoController.listarPorChamado(req, res, next),
);

export default router;