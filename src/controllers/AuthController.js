import AuthService from '../services/AuthService.js';

const authService = new AuthService();

class AuthController {
    constructor() {
        this.authService = authService;
    }

    async login(req, res, next) {
        try {
            const { email, senha } = req.body;
            
            const resultado = await this.authService.login(email, senha);

            return res.status(200).json(resultado);
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;
