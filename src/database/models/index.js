import Chamado from './Chamado.js';
import Usuario from './Usuario.js';
import Categoria from './Categorias.js';
import Comentario from './Comentarios.js';
import HistoricoChamado from './HistoricoChamado.js';

const models = {
    Chamado,
    Usuario,
    Categoria,
    Comentario,
    HistoricoChamado,
};

Object.values(models).forEach((model) => {
        model.associate?.(models);
});

export default models;