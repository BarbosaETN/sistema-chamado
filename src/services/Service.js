import models from "../database/models/index.js";
import NotFoundError from "../errors/NotFoundError.js";

class Service {
  constructor(nomeDoModel) {
    this.model = models[nomeDoModel];

    if (!this.model) {
      throw new Error(`Model "${nomeDoModel}" não encontrado.`);
    }
  }

  async criarRegistro(dados) {
    return await this.model.create(dados);
  }

  async listarTodos() {
    return await this.model.findAll();
  }

  async buscarRegistroPorId(id) {
    return await this.model.findByPk(id);
  }

  async obterRegistroPorId(id) {
    const registro = await this.buscarRegistroPorId(id);

    if (!registro) {
      throw new NotFoundError(`${this.model.name} não encontrado`);
    }

    return registro;
  }

  async atualizarRegistro(id, dados) {
    const registro = await this.obterRegistroPorId(id);

    await registro.update(dados);

    return registro;
  }

  async deletarRegistro(id) {
    const registro = await this.obterRegistroPorId(id);

    return await registro.destroy();
  }
}

export default Service;
