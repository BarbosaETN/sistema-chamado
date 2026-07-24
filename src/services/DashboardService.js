import { fn, col } from 'sequelize';

import STATUS from '../constants/status';
import PRIORIDADE from '../constants/prioridade';

import Service from './Service';

class DashboardService extends Service {
  constructor() {
    super('Chamado');
  }

  async obterResumo() {
    return {
      totalChamados: await this.model.count(),
      status: await this.model.obterResumoStatus(),
      prioridades: await this.model.obterResumoPrioridades(),
      categorias: await this.model.obterResumocategorias(),
    };
  }

  async obterResumoStatus() {
    const resultado = await this.model.findAll({
      attributes: ['status', [fn('COUNT', col('id')), 'total']],
      group: ['status'],
      raw: true,
    });

    const resumo = {
      aberto: 0,
      emAndamento: 0,
      resolvido: 0,
      fechado: 0,
    };

    resultado.forEach((item) => {
      switch (item.status) {
        case STATUS.ABERTO:
          resumo.aberto = Number(item.total);
          break;

        case STATUS.EM_ANDAMENTO:
          resumo.emAndamento = Number(item.total);
          break;

        case STATUS.RESOLVIDO:
          resumo.resolvido = Number(item.total);
          break;

        case STATUS.FECHADO:
          resumo.fechado = Number(item.total);
          break;
      }
    });

    return resumo;
  }

  async obterResumoPrioridades() {
    const resultado = await this.model.findAll({
      attributes: ['prioridade', [fn('COUNT', col('id')), 'total']],
      group: ['prioridade'],
      raw: true,
    });

    const resumo = {
      baixa: 0,
      media: 0,
      alta: 0,
      critica: 0,
    };

    resultado.forEach((item) => {
      switch (item.prioridade) {
        case PRIORIDADE.BAIXA:
          resumo.baixa = Number(item.total);
          break;

        case PRIORIDADE.MEDIA:
          resumo.media = Number(item.total);
          break;

        case PRIORIDADE.ALTA:
          resumo.alta = Number(item.total);
          break;

        case PRIORIDADE.CRITICA:
          resumo.critica = Number(item.total);
          break;
      }
    });

    return resumo;
  }

  async obterResumocategorias() {
    return await this.model.findAll({
        attributes: [
            'categoriaId',
            [fn('COUNT', col('id')), 'total'],
        ],
        include: [
            {
                association: 'categoria',
                attributes: ['id', 'nome'],
            },
        ],
        group: ['categoria.id', 'categoria'],
        raw: false,
    });
  }
}

export default DashboardService;