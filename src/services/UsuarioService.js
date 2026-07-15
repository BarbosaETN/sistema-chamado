import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import authConfig from '../config/auth.js';

import Service from './Service.js';
import ValidationError from '../errors/ValidationError.js';
import STATUS_CADASTRO from '../constants/statusCadastro.js';

class UsuarioService extends Service {
  constructor() {
    super('Usuario');
  }

  async criarRegistro(dados) {
    const usuarioExistente = await this.model.findOne({
      where: {
        email: dados.email,
      },
    });

    if (usuarioExistente) {
      throw new ValidationError("Já existe um usuário com este e-mail.");
    }

    // senha criptografa antes de ser salva
    dados.senha = await bcrypt.hash(dados.senha, authConfig.saltRounds);

    return await super.criarRegistro(dados);
  }

  async atualizarRegistro(id, dados) {
    if (dados.email) {
      const usuarioExistente = await this.model.findOne({
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

    // caso haja alteração na senha, ele criptografa novamente
    if (dados.senha) {
      dados.senha = await bcrypt.hash(dados.senha, authConfig.saltRounds);
    }

    return await super.atualizarRegistro(id, dados);
  }

  async alterarStatusCadastro(id, status) {
    const usuario = await this.obterRegistroPorId(id);

    usuario.statusCadastro = status;

    await usuario.save();

    return usuario;
  }

  async aprovarUsuario(id){
    return await this.alterarStatusCadastro(id, STATUS_CADASTRO.APROVADO);
  }   

  async rejeitarUsuario(id){
    return await this.alterarStatusCadastro(id, STATUS_CADASTRO.REJEITADO)
  }
}

export default UsuarioService;
