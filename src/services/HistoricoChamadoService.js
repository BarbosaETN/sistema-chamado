import Service from "./Service.js";

class HistoricoChamadoService extends Service {
  constructor() {
    super("HistoricoChamado");
  }

  async registrar({ chamadoId, usuarioId, acao, descricao }) {
    return await super.criarRegistro({
      chamadoId,
      usuarioId,
      acao,
      descricao,
    });
  }

  async listarPorChamado(chamadoId) {
    return await this.model.findAll({
      where: {
        chamadoId,
      },
      include: [
        {
          association: "usuario",
          attributes: ["id", "nome"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });
  }
}

export default HistoricoChamadoService;
