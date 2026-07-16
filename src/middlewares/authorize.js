import ForbiddenError from "../errors/ForbiddenError.js";

export default function authorize(...cargosPermitidos) {
    return (req, res, next) => {

        if (!req.usuario) {
            return next(new ForbiddenError('Usuário não autenticado.'));
        }   

        if (!cargosPermitidos.includes(req.usuario.cargo)) {
            return next(new ForbiddenError('Você não possui permissão para realizar essa ação'));
        }

        next();
    }
}