import AuthenticationError from '../errors/AuthenticationError.js';
import { validarToken } from '../utils/jwt.js';
import models from '../database/models/index.js';

export default async function authMiddleware(req, res, next){
    console.log(req.method, req.originalUrl);
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            throw new AuthenticationError('Token não informado.');
        }

        const [tipo, token] = authorization.split(' ');
        if (tipo !== 'Bearer') {
            throw new AuthenticationError('Formato do token inválido.');
        }

        if (!token) {
            throw new AuthenticationError('Token não informado.');
        }

        const payload = validarToken(token)

        const usuario = await models.Usuario.findByPk(payload.id);
        if (!usuario) {
            throw new AuthenticationError('Usuário inexistente')
        }

        req.usuario = {
            id: payload.id,
        };

        next();

    } catch (error) {
        next(error)
    }
}