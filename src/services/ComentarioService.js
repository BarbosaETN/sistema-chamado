import Service from "./Service.js";
import ChamadoService from "./ChamadoService.js";
import UsuarioService from "./UsuarioService.js";

import ValidationError from "../errors/ValidationError.js";

import STATUS from "../constants/status.js";

class ComentarioService extends Service {
  constructor() {
    super("Comentario");

    this.chamadoService = new ChamadoService();
    this.usuarioService = new UsuarioService();
  }

  async criarRegistro(dados) {
    if (!dados.conteudo?.trim()) {
      throw new ValidationError("O comentário é obrigatório.");
    }

    const chamado = await this.chamadoService.obterRegistroPorId(
      dados.chamadoId,
    );

    if (chamado.status === STATUS.FECHADO) {
      throw new ValidationError(
        "Não é possível comentar em um chamado fechado.",
      );
    }

    await this.usuarioService.obterRegistroPorId(dados.usuarioId);

    return await super.criarRegistro(dados);
  }

  async listarPorChamado(chamadoId) {
    await this.chamadoService.obterRegistroPorId(chamadoId);

    return await this.model.findAll({
      where: { chamadoId },
      include: [
        {
          association: "autor",
          attributes: ["id", "nome"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });
  }
}

export default ComentarioService;
