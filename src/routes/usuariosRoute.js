import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const usuarioController = new UsuarioController();

const router = Router();

router.use(authMiddleware);

router.get('/usuarios', (req, res, next) => usuarioController.listarRegistros(req, res, next));
router.get('/usuarios/:id', (req, res, next) => usuarioController.buscarUmPorId(req, res, next));
router.post('/usuarios', (req, res, next) => usuarioController.criarNovo(req, res, next));
router.put('/usuarios/:id', (req, res, next) => usuarioController.atualizarUmRegistro(req, res, next));
router.delete('/usuarios/:id', (req, res, next) => usuarioController.deletarRegistroPorId(req, res, next));


export default router;