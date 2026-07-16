import Chamado from './Chamado.js';
import Usuario from './Usuario.js';
import Categoria from './Categorias.js';

const models = {
    Chamado,
    Usuario,
    Categoria,
};

Object.values(models).forEach((model) => {
        model.associate?.(models);
});

export default models;