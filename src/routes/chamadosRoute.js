import { Router } from 'express';
import ChamadoController from '../controllers/ChamadoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authorize from '../middlewares/authorize.js';
import CARGO from '../constants/cargo.js';

const chamadoController = new ChamadoController();

const router = Router();

router.get('/chamados', (req, res, next) => chamadoController.listarRegistros(req, res, next));
router.get('/chamados/:id', (req, res, next) => chamadoController.buscarUmPorId(req, res, next));
router.post('/chamados', (req, res, next) => chamadoController.criarNovo(req, res, next));
router.put('/chamados/:id', (req, res, next) => chamadoController.atualizarUmRegistro(req, res, next));
router.delete('/chamados/:id', (req, res, next) => chamadoController.deletarRegistroPorId(req, res, next));
router.patch('chamados/:id/assumir'), authMiddleware, authorize(CARGO.TECNICO, CARGO.ADMIN), (req, res, next) => chamadoController.assumir(req, res, next);
router.patch('chamados/:id/resolver'), authMiddleware, authorize(CARGO.TECNICO, CARGO.ADMIN), (req, res, next) => chamadoController.resolver(req, res, next);
router.patch('chamados/:id/fechar'), authMiddleware, authorize(CARGO.TECNICO, CARGO.ADMIN), (req, res, next) => chamadoController.fechar(req, res, next);

export default router;