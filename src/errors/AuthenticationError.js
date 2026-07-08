import AppError from './AppError.js';

class AuthenticationError extends AppError {
    constructor(message = 'Email ou senha inválidos.') {
        super(message, 401);
    }
}

export default AuthenticationError;