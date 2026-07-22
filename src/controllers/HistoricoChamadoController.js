import HistoricoChamadoService from '../services/HistoricoChamadoService.js';

class HistoricoChamadoController {
  constructor() {
    this.service = new HistoricoChamadoService();
  }

  async listarPorChamado(req, res, next) {
    try {
      const historico = await this.service.listarPorChamado(
        Number(req.params.id),
      );

      return res.status(200).json(historico);
    } catch (error) {
      next(error);
    }
  }
}

export default HistoricoChamadoController;