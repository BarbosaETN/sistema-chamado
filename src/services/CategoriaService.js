import Service from './Service.js';
import ValidationError from '../errors/ValidationError.js';
import models from '../database/models/index.js';

class CategoriaService extends Service {
    constructor() {
        super('Categoria');
    }

    async criarRegistro(dados) {
        const categoriaExistente = await this.model.findOne({
            where: {
                nome: dados.nome,
            },
        });

        if (categoriaExistente){
            throw new ValidationError('Já existe uma categoria com esse nome.');
        }

        return await super.criarRegistro(dados);
    }

    async deletarRegistro(id){
        const categoria = await this.obterRegistroPorId(id);

        const quantidadeChamados = await models.Chamado.count({
            where: {
                categoriaId: categoria.id,
            },
        });

        if (quantidadeChamados > 0){
            throw new ValidationError('Não é possível excluir uma categoria que possui chamados.')
        }
    }
}

export default CategoriaService;
