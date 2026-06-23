import Service from './Service.js';
import Chamado from '../models/Chamado.js';

class ChamadoService extends Service {
    constructor() {
        super(Chamado);
    }
}

export default ChamadoService;