import AppError from './AppError.js';

class ValidationError extends AppError {
    constructor(message = 'Dados inválidos.') {
        super(message, 400);
    }
}

export default ValidationError;