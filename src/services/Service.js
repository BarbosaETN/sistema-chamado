import dataSource from '../database/models/index.js'

class Service {
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }

  async criarRegistro(dados) {
    return await dataSource[this.model].create(dados);   
  }

  async listarTodos() {
    return await dataSource[this.model].findAll();
  }

  async buscarRegistroPorId(id) {
    return await dataSource[this.model].findByPk(id)
  }

  async obterRegistroPorId(id) {
    const registro = await dataSource[this.model].buscarRegistroPorId(id);

    if (!registro) {   
      throw new Error('Registro não encontrado');
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