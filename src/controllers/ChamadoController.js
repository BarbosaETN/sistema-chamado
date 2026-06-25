import Controller from './Controller.js';
import ChamadoService from '../services/ChamadoService.js';

const chamadoService = new ChamadoService()

class ChamadoController extends Controller {
  constructor() {
    super(chamadoService);
  }
}

export default ChamadoController;