import Service from './Service.js';
import STATUS, { STATUS_VALUES } from '../constants/status.js';
import ValidationError from '../errors/ValidationError.js';

class ChamadoService extends Service {
  constructor() {
    super('Chamado');
  }

  async criarRegistro(dados) {
    dados.status = STATUS.ABERTO;

    if (!STATUS_VALUES.includes(dados.status)) {
      throw new ValidationError('Status inválido');
    }

    return await super.criarRegistro(dados);
  }

  async atualizarRegistro(id, dados) {
  if (dados.status && !STATUS_VALUES.includes(dados.status)) {
    throw new ValidationError('Status inválido');
  }

  return await super.atualizarRegistro(id, dados);
}
}

export default ChamadoService;