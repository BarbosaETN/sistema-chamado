import { jest } from '@jest/globals'
import jestConfig from '../../../jest.config.js';
import ChamadoService from '../../../src/services/ChamadoService.js';
import Service from '../../../src/services/Service.js';

describe('ChamadoService', () => {
  describe('atualizarRegistro', () => {
    it('deve rejeitar um status inválido', async () => {
      const service = new ChamadoService();

      await expect(
        service.atualizarRegistro(1, {
          status: 'banana',
        }),
      ).rejects.toThrow('Status inválido');
    });
  });

  describe('criarRegistro', () => {
    it('deve criar o chamado com status Aberto', async () => {
      const service = new ChamadoService();

      const categoriaSpy = jest
        .spyOn(service.categoriaService, 'obterRegistroPorId')
        .mockResolvedValue({ id: 1 });
      
      const historicoSpy = jest
        .spyOn(service.historicoService, 'registrar')
        .mockResolvedValue();
        
      const criarRegistroSpy = jest
        .spyOn(Service.prototype, 'criarRegistro')
        .mockResolvedValue({
          id: 1,   
          titulo: 'Computador não liga',
          descricao: 'Computador não liga',  
          setor: 'Financeiro',  
          status: 'Aberto',
          categoriaId: 1,  
          usuarioId: 10, 
        });
    
      const dados = {
        titulo: 'Computador não liga',
        descricao: 'Computador não liga',
        setor: 'Financeira',
        status: 'Resolvido',
        categoriaId: 1,
      };
      
      const resultado = await service.criarRegistro(dados, 10);

      expect(resultado.status).toBe('Aberto');

      categoriaSpy.mockRestore();
      historicoSpy.mockRestore();
      criarRegistroSpy.mockRestore();
    });
  });
});
