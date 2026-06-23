class Service {
  constructor(model) {
    this.model = model;
  }

  async criar(dados) {
    return await this.model.create(dados);
  }

  async listar() {
    return await this.model.findAll();
  }

  async buscarPorId(id) {
    return await this.model.findByPk(id);
  }

  async atualizar(id, dados) {
    const registro = await this.buscarPorId(id);

    if (!registro) {
      throw new Error('Registro não encontrado');
    }

    await registro.update(dados);

    return registro;
  }

  async deletar(id) {
    const registro = await this.buscarPorId(id);

    if (!registro) {
      throw new Error('Registro não encontrado');
    }

    await registro.destroy();
  }
}

export default Service;