import Service from "./Service.js";
import CategoriaService from "./CategoriaService.js";
import HistoricoChamadoService from "./HistoricoChamadoService.js";
import HISTORICO_ACAO from "../constants/historicoAcao.js";
import STATUS, { STATUS_VALUES } from "../constants/status.js";
import ValidationError from "../errors/ValidationError.js";
import models from "../database/models/index.js";
import { Op  } from 'sequelize';

class ChamadoService extends Service {
  constructor() {
    super("Chamado");

    this.categoriaService = new CategoriaService();
    this.historicoService = new HistoricoChamadoService();
  }

  async criarRegistro(dados, ususarioId) {
    dados.status = STATUS.ABERTO;
    dados.usuarioId = ususarioId;

    if (!STATUS_VALUES.includes(dados.status)) {
      throw new ValidationError("Status inválido");
    }

    await this.categoriaService.obterRegistroPorId(dados.categoriaId);

    console.log(dados);

    const chamado = await super.criarRegistro(dados);

    await this.historicoService.registrar({
      chamadoId: chamado.id,
      usuarioId: chamado.usuarioId,
      acao: HISTORICO_ACAO.CRIADO,
      descricao: "Chamado criado.",
    });

    return chamado;
  }

  async listarRegistros(filtros = {}){
    const where = {};

    if (filtros.status) {
      where.status = filtros.status;
    }

    if (filtros.prioridade) {
      where.prioridade = filtros.prioridade;
    }

    if (filtros.categoriaId) {
      where.categoriaId = filtros.categoriaId;
    }

    if (filtros.tecnicoId) {
      where.tecnicoId = filtros.tecnicoId;
    }

    if (filtros.busca) {
      where[Op.or] = [
        {
          titulo: {
            [Op.like]: `%${filtros.busca}%`,
          },
        },
        {
          descricao: {
            [Op.like]: `%${filtros.busca}%`,
          },
        },
      ];
    }

    return await this.model.findAll({
      where,
      include: [
        {
          association: 'categoria',
        },
        {
          association: 'tecnico',
          attributes: ['id', 'nome'],
        },
        {
          association: 'usuario',
          attributes: ['id', 'nome'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async atualizarRegistro(id, dados) {
    if (dados.status && !STATUS_VALUES.includes(dados.status)) {
      throw new ValidationError("Status inválido");
    }

    return await super.atualizarRegistro(id, dados);
  }

  async assumirChamado(id, tecnicoId) {
    const chamado = await this.obterRegistroPorId(id);

    if (chamado.tecnicoId) {
      throw new ValidationError("Este chamado já foi assumido.");
    }

    chamado.tecnicoId = tecnicoId;
    chamado.status = STATUS.EM_ANDAMENTO;

    await chamado.save();

    await this.historicoService.registrar({
      chamadoId: chamado.id,
      usuarioId: tecnicoId,
      acao: HISTORICO_ACAO.ASSUMIDO,
      descricao: 'Chamado assumido pelo técnico.',
    });    

    return chamado;
  }

  async resolverChamado(id) {
    const chamado = await this.obterRegistroPorId(id);

    if (chamado.status !== STATUS.EM_ANDAMENTO) {
      throw new ValidationError(
        "Somente chamados em andamento podem ser resolvidos.",
      );
    }

    chamado.status = STATUS.RESOLVIDO;

    await chamado.save();

    await this.historicoService.registrar({
      chamadoId: chamado.id,
      usuarioId: chamado.tecnicoId,
      acao: HISTORICO_ACAO.RESOLVIDO,
      descricao: 'Chamado resolvido.',
    });    

    return chamado;
  }

  async fecharChamado(id) {
    const chamado = await this.obterRegistroPorId(id);

    if (chamado.status !== STATUS.RESOLVIDO) {
      throw new ValidationError(
        "Somente chamados resolvidos podem ser fechados.",
      );
    }

    chamado.status = STATUS.FECHADO;

    await chamado.save();

    await this.historicoService.registrar({
      chamadoId: chamado.id,
      usuarioId: chamado.tecnicoId,
      acao: HISTORICO_ACAO.FECHADO,
      descricao: 'Chamado fechado.',
    });    

    return chamado;
  }

  async obterRegistros() {
    return await this.model.findAll({
      include: [
        {
          model: models.Categoria,
          as: "categoria",
        },
      ],
    });
  }
}

export default ChamadoService;
