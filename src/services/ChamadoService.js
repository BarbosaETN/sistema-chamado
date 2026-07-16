import Service from './Service.js';
import CategoriaService from './CategoriaService.js'
import STATUS, { STATUS_VALUES } from '../constants/status.js';
import ValidationError from '../errors/ValidationError.js';
import models from '../database/models/index.js';

class ChamadoService extends Service {
  constructor() {
    super('Chamado');

    this.categoriaService = new CategoriaService();
  }

  async criarRegistro(dados, ususarioId) {
    dados.status = STATUS.ABERTO;
    dados.usuarioId = ususarioId;

    if (!STATUS_VALUES.includes(dados.status)) {
      throw new ValidationError('Status inválido');
    }

    await this.categoriaService.obterRegistroPorId(
        dados.categoriaId
    );
    
    console.log(dados);

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

    if (chamado.tecnicoId){
      throw new ValidationError("Este chamado já foi assumido.")
    }

    chamado.tecnicoId = tecnicoId;
    chamado.status = STATUS.EM_ANDAMENTO;

    await chamado.save();

    return chamado;
  }

  async resolverChamado(id) {
    const chamado = await this.obterRegistroPorId(id);

    if (chamado.status !== STATUS.EM_ANDAMENTO) {
      throw new ValidationError("Somente chamados em andamento podem ser resolvidos.")
    }
    
    chamado.status = STATUS.RESOLVIDO;
    
    await chamado.save();

    return chamado;
  }
  
  async fecharChamado(id) {
    const chamado = await this.obterRegistroPorId(id);

    if (chamado.status !== STATUS.RESOLVIDO){
      throw new ValidationError("Somente chamados resolvidos podem ser fechados.")
    }
    
    chamado.status = STATUS.FECHADO;

    await chamado.save();

    return chamado;
  }

  async obterRegistros() {
      return await this.model.findAll({
          include: [
              {
                  model: models.Categoria,
                  as: 'categoria',
              },
          ],
      });
  }  
}

export default ChamadoService;