import { Router } from 'express';

import CategoriaController from '../controllers/CategoriaController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authorize from '../middlewares/authorize.js';

import CARGO from '../constants/cargo.js';

const router = Router();
const categoriaController = new CategoriaController();

router.get('/categorias', authMiddleware, (req, res, next) => categoriaController.listarRegistros(req, res, next));
router.get('/categorias/:id',authMiddleware, (req, res, next) => categoriaController.buscarUmPorId(req, res, next));
router.post('/categorias', authMiddleware, authorize(CARGO.ADMIN), (req, res, next) => categoriaController.criarNovo(req, res, next));
router.put('/categorias/:id', authMiddleware, authorize(CARGO.ADMIN), (req, res, next) => categoriaController.atualizarUmRegistro(req, res, next));
router.delete('/categorias/:id', authMiddleware, authorize(CARGO.ADMIN), (req, res, next) =>categoriaController.deletarRegistroPorId(req, res, next));

export default router;