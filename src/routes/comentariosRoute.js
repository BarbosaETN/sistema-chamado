import { Router } from 'express';

import ComentarioController from '../controllers/ComentarioController.js';

import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
const comentarioController = new ComentarioController();

router.post(
  '/chamados/:id/comentarios',
  authMiddleware,
  (req, res, next) => {
    req.body.chamadoId = Number(req.params.id);

    comentarioController.criarNovo(req, res, next);
  },
);

router.get(
  '/chamados/:id/comentarios',
  authMiddleware,
  (req, res, next) => {
    comentarioController.listarPorChamado(req, res, next);
  },
);

export default router;