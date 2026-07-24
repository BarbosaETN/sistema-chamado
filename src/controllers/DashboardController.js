import DashboardService from '../services/DashboardService.js';

class DashboardController {
  constructor() {
    this.service = new DashboardService();
  }

  async obterResumo(req, res, next) {
    try {
      const resumo = await this.service.obterResumo();

      return res.status(200).json(resumo);
    } catch (error) {
      next(error);
    }
  }
}

export default DashboardController;