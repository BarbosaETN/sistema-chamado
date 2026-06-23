import Controller from './Controller.js';
import ChamadoService from '../services/ChamadoService.js';

const chamadoService = new ChamadoService()

export default class ChamadoController extends Controller {
  constructor() {
    super(chamadoService);
  }
}