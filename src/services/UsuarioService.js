import Service from './Service.js';
import dataSource from '../database/models/index.js';
import ValidationError from '../errors/ValidationError.js';

class UsuarioService extends Service {
  constructor() {
    super('Usuario');
  }

  async criarRegistro(dados) {
    const usuarioExistente = await dataSource.Usuario.findOne({
      where: {
        email: dados.email,
      },
    });

    if (usuarioExistente) {
      throw new ValidationError("Já existe um usuário com este e-mail.");
    }

    return await super.criarRegistro(dados);
  }

  async atualizarRegistro(id, dados) {
    if (dados.email) {
      const usuarioExistente = await dataSource.Usuario.findOne({
        where: {
          email: dados.email,
          id: {
            [Op.ne]: id,
          },
        },
      });

      if (usuarioExistente) {
        throw new ValidationError('Já existe um usuário com este e-mail.');
      }
    }

    return await super.atualizarRegistro(id, dados);
  }
}

export default UsuarioService;
