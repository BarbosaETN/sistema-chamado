import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import CARGO from '../constants/cargo.js';
import authorize from '../middlewares/authorize.js';

const usuarioController = new UsuarioController();

const router = Router();

router.get('/usuarios', authMiddleware, (req, res, next) => usuarioController.listarRegistros(req, res, next));
router.get('/usuarios/:id', authMiddleware, (req, res, next) => usuarioController.buscarUmPorId(req, res, next));
router.post('/usuarios', (req, res, next) => usuarioController.criarNovo(req, res, next));
router.put('/usuarios/:id', authMiddleware, (req, res, next) => usuarioController.atualizarUmRegistro(req, res, next));
router.delete('/usuarios/:id', authMiddleware, (req, res, next) => usuarioController.deletarRegistroPorId(req, res, next));
router.patch('/usuarios/:id/aprovar', authMiddleware, authorize(CARGO.ADMIN), (req, res, next) => usuarioController.aprovar(req, res, next));
router.patch('/usuarios/:id/rejeitar', authMiddleware, authorize(CARGO.ADMIN), (req, res, next) => usuarioController.rejeitar(req, res, next));


export default router;