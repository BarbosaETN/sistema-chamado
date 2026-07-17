import Controller from "./Controller.js";
import ComentarioService from "../services/ComentarioService.js";

const comentarioService = new ComentarioService();

class ComentarioController extends Controller {
  constructor() {
    super(comentarioService);
  }

  async criarNovo(req, res, next) {
    try {
      const dados = {
        ...req.body,
        usuarioId: req.usuario.id,
      };

      const comentario = await this.service.criarRegistro(dados);

      return res.status(201).json(comentario);
    } catch (erro) {
      next(erro);
    }
  }

  async listarPorChamado(req, res, next) {
    try {
      const comentarios = await this.service.listarPorChamado(req.params.id);

      return res.status(200).json(comentarios);
    } catch (erro) {
      next(erro);
    }
  }
}

export default ComentarioController;
