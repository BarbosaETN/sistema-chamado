import Controller from './Controller.js';
import ChamadoService from '../services/ChamadoService.js';

const chamadoService = new ChamadoService()

class ChamadoController extends Controller {
  constructor() {
    super(chamadoService);
  }

  async assumir(req, res, next) {
    try {
      const { id } = req.params;

      const chamado = await this.service.assumirChamado(id, req.usuario.id);

      return res.status(200).json(chamado)      
    } catch (error) {
      next(error)  
    }
  }
  
  async resolver(req, res, next) {
    try {
      const { id } = req.params;

      const chamado = await this.service.resolverChamado(id);

      return res.status(200).json(chamado)      
    } catch (error) {
      next(error)  
    }
  }
  
  async fechar(req, res, next) {
    try {
      const { id } = req.params;

      const chamado = await this.service.fecharChamado(id);

      return res.status(200).json(chamado)      
    } catch (error) {
      next(error)  
    }
  }
}

export default ChamadoController;