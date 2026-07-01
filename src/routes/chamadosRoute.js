import { Router } from 'express';
import ChamadoController from '../controllers/ChamadoController.js';

const chamadoController = new ChamadoController();

const router = Router();

router.get('/chamados', (req, res, next) => chamadoController.listarRegistros(req, res, next));
router.get('/chamados/:id', (req, res, next) => chamadoController.buscarUmPorId(req, res, next));
router.post('/chamados', (req, res, next) => chamadoController.criarNovo(req, res, next));
router.put('/chamados/:id', (req, res, next) => chamadoController.atualizarUmRegistro(req, res, next));
router.delete('/chamados/:id', (req, res, next) => chamadoController.deletarRegistroPorId(req, res, next));


export default router;