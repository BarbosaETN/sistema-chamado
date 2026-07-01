import AppError from './AppError.js';

class NotFoundError extends AppError {
    constructor(message = 'Registro não encontrado.') {
        super(message, 404);
    }    
}

export default NotFoundError;