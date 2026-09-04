import { jest } from '@jest/globals';

import ComentarioService from '../../../src/services/ComentarioService.js';

import STATUS from '../../../src/constants/status.js';
import HISTORICO_ACAO from '../../../src/constants/historicoAcao.js';

describe('ComentarioService', () => {
  describe('criarRegistro', () => {
    it('deve criar um comentário válido e registrar o histórico', async () => {
      const comentarioService = new ComentarioService();

      const dados = {
        conteudo: 'Este é um comentário de teste.',
        chamadoId: 1,
        usuarioId: 2,
      };

      const chamadoMock = {
        id: 1,
        status: STATUS.ABERTO,
      };

      const comentarioMock = {
        id: 1,
        ...dados,
      };

      comentarioService.chamadoService.obterRegistroPorId = jest
        .fn()
        .mockResolvedValue(chamadoMock);

      comentarioService.usuarioService.obterRegistroPorId = jest
        .fn()
        .mockResolvedValue({
          id: 2,
        });

      comentarioService.model.create = jest
        .fn()
        .mockResolvedValue(comentarioMock);

      comentarioService.historicoService.registrar = jest
        .fn()
        .mockResolvedValue({});

      const resultado = await comentarioService.criarRegistro(dados);

      expect(
        comentarioService.chamadoService.obterRegistroPorId,
      ).toHaveBeenCalledWith(1);

      expect(
        comentarioService.usuarioService.obterRegistroPorId,
      ).toHaveBeenCalledWith(2);

      expect(
        comentarioService.model.create,
      ).toHaveBeenCalledWith(dados);

      expect(
        comentarioService.historicoService.registrar,
      ).toHaveBeenCalledWith({
        chamadoId: 1,
        usuarioId: 2,
        acao: HISTORICO_ACAO.COMENTARIO_ADICIONADO,
        descricao: 'Comentário adicionado ao chamado.',
      });

      expect(resultado).toEqual(comentarioMock);
    });

    it('deve rejeitar um comentário vazio', async () => {
        const comentarioService = new ComentarioService();

        const dados = {
            conteudo: '',
            chamadoId: 1,
            usuarioId: 2,
        };

        await expect(
            comentarioService.criarRegistro(dados),
        ).rejects.toThrow('O comentário é obrigatório.');
    });

    it('deve rejeitar um comentário contendo apenas espaços', async () => {
        const comentarioService = new ComentarioService();

        const dados = {
            conteudo: '     ',
            chamadoId: 1,
            usuarioId: 2,
        };

        await expect(
            comentarioService.criarRegistro(dados),
        ).rejects.toThrow('O comentário é obrigatório.');
    });
  });
});