class Controller {
    constructor(service) {
        this.service = service;
    }

    async listarRegistros(req, res) {
        try {
            const dados = await this.service.listarTodos()
            return res.send(200).json(dados)
        } catch (error) {
            return res.status(500).json({ erro: erro.message });
        }
    }

    async buscarUmPorId(req, res) {
        const { id } = req.params 
        try {
            const dado = await this.service.buscarRegistroPorId(id)

            if (!dado) {
                return res.status(404).json({ erro: 'Registro não encontrado' });
            }
            
            return res.send(200).json(dado)
        } catch (error) {
            return res.status(500).json({ erro: erro.message });
        }
    }
    
    async criarNovo(req, res) {
        const criacaoDados = req.body 
        try {
            const dado = await this.service.criarRegistro(criacaoDados)
            return res.send(200).json(dado)
        } catch (error) {
            return res.status(500).json({ erro: erro.message });
        }
    }
   
    async atualizarUmRegistro(req, res) {
        const id = req.params
        const dadosAtualizados = req.body 
        try {
            const dado = await this.service.atualizarRegistro(id, dadosAtualizados)
            if (!dado) {
                return res.status(400).json({ mensagem: 'não foi atualizado' });
            }
            return res.send(200).json(dado)
        } catch (error) {
            return res.status(500).json({ erro: erro.message });
        }
    }
    
    async deletarRegistroPorId(req, res) {
        const { id } = req.params 
        try {
            await this.service.deletarRegistro(id)
            return res.status(200).json({ mensagem: `id ${id} deletado` });
        } catch (error) {
            return res.status(500).json({ erro: erro.message });
        }
    }    
}

export default Controller;