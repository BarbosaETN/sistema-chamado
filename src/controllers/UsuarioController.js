import Controller from './Controller.js';
import UsuarioService from '../services/UsuarioService.js';

const usuarioService = new UsuarioService()

class UsuarioController extends Controller {
  constructor() {
    super(usuarioService);
    this.usuarioService = usuarioService;
  }

  async aprovar(req, res, next){
    try {
        const { id } = req.params

        const usuario = await this.usuarioService.aprovarUsuario(id);
      
        return res.status(200).json(usuario);
    } catch (error) {
          next(error);
    }
  }

  async rejeitar(req, res, next){
    try {
        const { id } = req.params

        const usuario = await this.usuarioService.rejeitarUsuario(id);

        return res.status(200).json(usuario);
    } catch (error) {
          next(error);
    }
  }
}

export default UsuarioController;