import { Router } from 'express';
import ChamadoController from '../controllers/ChamadoController.js';

const chamadoController = new ChamadoController();

const router = Router();

router.get('/chamados', (req, res) => chamadoController.listarRegistros(req, res));
router.get('/chamados/:id', (req, res) => chamadoController.buscarUmPorId(req, res));
router.post('/chamados', (req, res) => chamadoController.criarNovo(req, res));
router.put('/chamados/:id', (req, res) => chamadoController.atualizarUmRegistro(req, res));
router.delete('/chamados/:id', (req, res) => chamadoController.deletarRegistroPorId(req, res));


export default router;