class Controller {
    contructor(service) {
        this.service = service;
    }

    async listar(req, res) {
        try {
            const dados = await this.service.listar()
            return res.send(200).json(dados)
        } catch (error) {
            return res.status(500).json({ erro: erro.message });
        }
    }

    async buscarPorId(req, res) {
        const { id } = req.params 
        try {
            const dado = await this.service.buscarPorId(id)
            return res.send(200).json(dado)
        } catch (error) {
            return res.status(500).json({ erro: erro.message });
        }
    }
    
    async criar(req, res) {
        const criacaoDados = req.body 
        try {
            const dado = await this.service.criar(criacaoDados)
            return res.send(200).json(dado)
        } catch (error) {
            return res.status(500).json({ erro: erro.message });
        }
    }
   
    async atualizar(req, res) {
        const id = req.params
        const dadosAtualizados = req.body 
        try {
            const dado = await this.service.atualizar(id, dadosAtualizados)
            if (!dado) {
                return res.status(400).json({ mensagem: 'não foi atualizado' });
            }
            return res.send(200).json(dado)
        } catch (error) {
            return res.status(500).json({ erro: erro.message });
        }
    }
    
    async deletar(req, res) {
        const { id } = req.params 
        try {
            await this.service.deletar(id)
            return res.status(200).json({ mensagem: `id ${id} deletado` });
        } catch (error) {
            return res.status(500).json({ erro: erro.message });
        }
    }    
}

export default Controller;