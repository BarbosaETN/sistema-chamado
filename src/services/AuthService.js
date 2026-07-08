import bcrypt from 'bcrypt';

import AuthenticationError from '../errors/AuthenticationError.js';
import Service from './Service.js';
import { gerarToken } from '../utils/jwt.js';
import STATUS_CADASTRO from '../constants/statusCadastro.js';
import ForbiddenError from '../errors/ForbiddenError.js';


class AuthService extends Service {
    constructor() {
        super('Usuario');
    }

    async login(email, senha) {
        const usuario = await this.model.findOne({
            where: { email },
        });

        if (!usuario){
            throw new AuthenticationError();
        }

        if (usuario.statusCadastro === STATUS_CADASTRO.PENDENTE) {
            throw new ForbiddenError('Usuário pendente de aprovação.')
        }
        
        if (usuario.statusCadastro === STATUS_CADASTRO.REJEITADO) {
            throw new ForbiddenError('Usuário rejeitado.');
        }

        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaValida) {
            throw new AuthenticationError();
        }

        const token = gerarToken({
            id: usuario.id,
        });

        return {
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                cargo: usuario.cargo,
            },
            token,
        }
    }
}

export default AuthService;