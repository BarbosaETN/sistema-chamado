import AppError from "./AppError.js";

class ForbiddenError extends AppError {
    constructor(message = "Acesso negado.") {
        super(message, 403);
    }
}

export default ForbiddenError;