import { jest } from '@jest/globals';

import ComentarioService from '../../../src/services/ComentarioService.js';

import STATUS from '../../../src/constants/status.js';
import HISTORICO_ACAO from '../../../src/constants/historicoAcao.js';
import NotFoundError from '../../../src/errors/NotFoundError.js';

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

    it("deve rejeitar comentário em um chamado fechado", async () => {
      const comentarioService = new ComentarioService();

      const dados = {
        conteudo: "Tentativa de comentário.",
        chamadoId: 1,
        usuarioId: 2,
      };

      comentarioService.chamadoService.obterRegistroPorId = jest
        .fn()
        .mockResolvedValue({
          id: 1,
          status: STATUS.FECHADO,
        });

      await expect(
        comentarioService.criarRegistro(dados),
      ).rejects.toThrow(
        "Não é possível comentar em um chamado fechado.",
      );
    });

    it("deve rejeitar comentário em chamado inexistente", async () => {
      const comentarioService = new ComentarioService();

      const dados = {
        conteudo: "Tentativa de comentário.",
        chamadoId: 999,
        usuarioId: 2,
      };

      comentarioService.chamadoService.obterRegistroPorId = jest
        .fn()
        .mockRejectedValue(
          new NotFoundError("Chamado não encontrado"),
        );

      await expect(
        comentarioService.criarRegistro(dados),
      ).rejects.toThrow("Chamado não encontrado");
    });

    it("deve rejeitar comentário de usuário inexistente", async () => {
      const comentarioService = new ComentarioService();

      const dados = {
        conteudo: "Comentário de usuário inexistente.",
        chamadoId: 1,
        usuarioId: 999,
      };

      comentarioService.chamadoService.obterRegistroPorId = jest
        .fn()
        .mockResolvedValue({
          id: 1,
          status: STATUS.ABERTO,
        });

      comentarioService.usuarioService.obterRegistroPorId = jest
        .fn()
        .mockRejectedValue(
          new NotFoundError("Usuário não encontrado"),
        );

      await expect(
        comentarioService.criarRegistro(dados),
      ).rejects.toThrow("Usuário não encontrado");
    });
  });
  
  describe('listarRegistro', () => {
    it("deve listar os comentários de um chamado", async () => {
      const comentarioService = new ComentarioService();

      const comentarios = [
        {
          id: 1,
          conteudo: "Primeiro comentário.",
          chamadoId: 1,
          usuarioId: 2,
        },
        {
          id: 2,
          conteudo: "Segundo comentário.",
          chamadoId: 1,
          usuarioId: 3,
        },
      ];

      comentarioService.chamadoService.obterRegistroPorId = jest
        .fn()
        .mockResolvedValue({
          id: 1,
          status: STATUS.ABERTO,
        });

      comentarioService.model.findAll = jest
        .fn()
        .mockResolvedValue(comentarios);

      const resultado = await comentarioService.listarPorChamado(1);

      expect(
        comentarioService.chamadoService.obterRegistroPorId,
      ).toHaveBeenCalledWith(1);

      expect(comentarioService.model.findAll).toHaveBeenCalledWith({
        where: { chamadoId: 1 },
        include: [
          {
            association: "autor",
            attributes: ["id", "nome"],
          },
        ],
        order: [["createdAt", "ASC"]],
      });  

      expect(resultado).toEqual(comentarios);
    });

    it("deve rejeitar a listagem de comentários de um chamado inexistente", async () => {
      const comentarioService = new ComentarioService();

      comentarioService.chamadoService.obterRegistroPorId = jest
        .fn()
        .mockRejectedValue(
          new NotFoundError("Chamado não encontrado"),
        );

      comentarioService.model.findAll = jest.fn();

      await expect(
        comentarioService.listarPorChamado(999),
      ).rejects.toThrow("Chamado não encontrado");

      expect(
        comentarioService.chamadoService.obterRegistroPorId,
      ).toHaveBeenCalledWith(999);

      expect(comentarioService.model.findAll).not.toHaveBeenCalled();
    });

    it("deve retornar os comentários em ordem cronológica", async () => {
      const comentarioService = new ComentarioService();

      const comentarios = [
        {
          id: 1,
          conteudo: "Comentário mais antigo.",
          chamadoId: 1,
          usuarioId: 2,
          createdAt: new Date("2026-09-10T10:00:00"),
        },
        {
          id: 2,
          conteudo: "Comentário mais recente.",
          chamadoId: 1,
          usuarioId: 3,
          createdAt: new Date("2026-09-10T11:00:00"),
        },
      ];

      comentarioService.chamadoService.obterRegistroPorId = jest
        .fn()
        .mockResolvedValue({
          id: 1,
          status: STATUS.ABERTO,
        });

      comentarioService.model.findAll = jest
        .fn()
        .mockResolvedValue(comentarios);

      const resultado = await comentarioService.listarPorChamado(1);

      expect(comentarioService.model.findAll).toHaveBeenCalledWith({
        where: { chamadoId: 1 },
        include: [
          {
            association: "autor",
            attributes: ["id", "nome"],
          },
        ],
        order: [["createdAt", "ASC"]],
      });

      expect(resultado[0].createdAt.getTime()).toBeLessThan(
        resultado[1].createdAt.getTime(),
      );
    });

    it("deve incluir os dados do autor ao listar comentários", async () => {
      const comentarioService = new ComentarioService();

      const comentarios = [
        {
          id: 1,
          conteudo: "Comentário do usuário.",
          chamadoId: 1,
          usuarioId: 2,
          autor: {
            id: 2,
            nome: "João da Silva",
          },
        },
      ];

      comentarioService.chamadoService.obterRegistroPorId = jest
        .fn()
        .mockResolvedValue({
          id: 1,
          status: STATUS.ABERTO,
        });

      comentarioService.model.findAll = jest
        .fn()
        .mockResolvedValue(comentarios);

      const resultado = await comentarioService.listarPorChamado(1);

      expect(comentarioService.model.findAll).toHaveBeenCalledWith({
        where: { chamadoId: 1 },
        include: [
          {
            association: "autor",
            attributes: ["id", "nome"],
          },
        ],
        order: [["createdAt", "ASC"]],
      });

      expect(resultado[0].autor).toEqual({
        id: 2,
        nome: "João da Silva",
      });
    });
  })
});