class Controller {
    constructor(service) {
        this.service = service;
    }

    async listarRegistros(req, res, next) {
        try {
            const dados = await this.service.listarTodos()
            return res.status(200).json(dados)
        } catch (error) {
            next(error);
        }
    }

    async buscarUmPorId(req, res, next) {
        const { id } = req.params 
        try {
            const dado = await this.service.obterRegistroPorId(Number(id))

            return res.status(200).json(dado)
        } catch (error) {
            next(error);
        }
    }
    
    async criarNovo(req, res, next) {
        const criacaoDados = req.body 
        try {
            const dado = await this.service.criarRegistro(criacaoDados)
            return res.status(201).json(dado)
        } catch (error) {
            next(error);
        }
    }
   
    async atualizarUmRegistro(req, res, next) {
        const { id } = req.params
        const dadosAtualizados = req.body 
        try {
            const dado = await this.service.atualizarRegistro(Number(id), dadosAtualizados)
            return res.status(200).json(dado)
        } catch (error) {
            next(error);
        }
    }
    
    async deletarRegistroPorId(req, res, next) {
        const { id } = req.params 
        try {
            await this.service.deletarRegistro(Number(id))
            return res.status(200).json({ mensagem: `id ${id} deletado` });
        } catch (error) {
            next(error);
        }
    }    
}

export default Controller;