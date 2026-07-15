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

  async assumirChamado(id, tecnicoId) {
    const chamado = await this.obterRegistroPorId(id);

    chamado.tecnicoId = tecnicoId;
    chamado.status = STATUS.EM_ANDAMENTO;

    if (chamado.tecnicoId){
      throw new ValidationError("Este chamado já foi assumido.")
    }

    await chamado.save();

    return chamado;
  }

  async resolverChamado(id) {
    const chamado = await this.obterRegistroPorId(id);

    chamado.status = STATUS.RESOLVIDO;

    if (chamado.status !== STATUS.EM_ANDAMENTO) {
      throw new ValidationError("Somente chamados em andamento podem ser resolvidos.")
    }

    chamado.save();

    return chamado;
  }
  
  async fecharChamado(id) {
    const chamado = await this.obterRegistroPorId(id);

    chamado.status = STATUS.FECHADO;

    if (chamado.status !== STATUS.RESOLVIDO){
      throw new ValidationError("Somente chamados resolvidos podem ser fechados.")
    }

    chamado.save();

    return chamado;
  }


}

export default ChamadoService;