import Chamado from './Chamado.js';
import Usuario from './Usuario.js';

const models = {
    Chamado,
    Usuario,
};

Object.values(models).forEach((model) => {
        model.associate?.(models);
});

export default models;