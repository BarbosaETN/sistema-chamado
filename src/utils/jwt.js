import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.js';
import AuthenticationError from '../errors/AuthenticationError.js';

export function gerarToken(payload) {
    return jwt.sign(payload, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
    });
}

export function validarToken(token) {
    try {
        return jwt.verify(token, authConfig.secret);
    } catch {
        throw new AuthenticationError('Token inválido ou expirado.')
    }
}
