import { afterEach, expect, jest } from '@jest/globals'
import jestConfig from '../../../jest.config.js';
import ChamadoService from '../../../src/services/ChamadoService.js';
import Service from '../../../src/services/Service.js';
import HISTORICO_ACAO from '../../../src/constants/historicoAcao.js';

afterEach(() => {
  jest.restoreAllMocks();
});

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
    it('deve criar o chamado com status Aberto, validar categoria e registrar historico', async () => {
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

      expect(categoriaSpy).toHaveBeenCalledWith(1);

      expect(historicoSpy).toHaveBeenCalledWith({
        chamadoId: 1,
        usuarioId: 10,
        acao: HISTORICO_ACAO.CRIADO,
        descricao: 'Chamado criado.',
      });
    });
  });

  describe('assumirChamado', () => {
    it('deve rejeitar um chamado que já possui técnico', async () => {
      const service = new ChamadoService();

      jest
        .spyOn(service, 'obterRegistroPorId')
        .mockResolvedValue({
          id: 1,
          tecnicoId: 10,
        });

      await expect(
        service.assumirChamado(1, 20)
      ).rejects.toThrow('Este chamado já foi assumido.')
    })

    it('deve assumir um chamado disponível', async () => {
      const service = new ChamadoService();

      const chamado = {
        id: 1,
        tecnicoId: null,
        status: 'Aberto',
        save: jest.fn().mockResolvedValue(),
      };

      jest
        .spyOn(service, 'obterRegistroPorId')
        .mockResolvedValue(chamado);

      const historicoSpy = jest
        .spyOn(service.historicoService, 'registrar')
        .mockResolvedValue();

      const resultado = await service.assumirChamado(1, 10);

      expect(resultado.tecnicoId).toBe(10);
      expect(resultado.status).toBe('EM ANDAMENTO');

      expect(chamado.save).toHaveBeenCalled();

      expect(historicoSpy).toHaveBeenCalledWith({
        chamadoId: 1,
        usuarioId: 10,
        acao: HISTORICO_ACAO.ASSUMIDO,
        descricao: 'Chamado assumido pelo técnico.'
      })
    })
  })
});
