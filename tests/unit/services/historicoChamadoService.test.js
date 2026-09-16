import HistoricoChamadoService from "../../../src/services/HistoricoChamadoService.js";
import { jest } from "@jest/globals";

describe("HistoricoChamadoService", () => {
  let service;

  beforeEach(() => {
    service = new HistoricoChamadoService();
  });

  describe("registrar", () => {
    it("deve registrar um histórico", async () => {
      const dados = {
        chamadoId: 1,
        usuarioId: 2,
        acao: "Criado",
        descricao: "Chamado criado.",
      };

      jest.spyOn(service.model, "create").mockResolvedValue(dados);

      const resultado = await service.registrar(dados);

      expect(resultado).toEqual(dados);

      expect(service.model.create).toHaveBeenCalledWith(dados);
    });

    it("deve retornar o histórico registrado", async () => {
      const historico = {
        id: 10,
        chamadoId: 1,
        usuarioId: 2,
        acao: "Assumido",
        descricao: "Chamado assumido pelo técnico.",
      };

      jest.spyOn(service.model, "create").mockResolvedValue(historico);

      const resultado = await service.registrar({
        chamadoId: 1,
        usuarioId: 2,
        acao: "Assumido",
        descricao: "Chamado assumido pelo técnico.",
      });

      expect(resultado).toBe(historico);
    });

    it("deve registrar todos os dados do histórico corretamente", async () => {
      const dados = {
        chamadoId: 15,
        usuarioId: 8,
        acao: "Resolvido",
        descricao: "Chamado resolvido pelo técnico.",
      };

      const createSpy = jest
        .spyOn(service.model, "create")
        .mockResolvedValue(dados);

      await service.registrar(dados);

      expect(createSpy).toHaveBeenCalledWith({
        chamadoId: 15,
        usuarioId: 8,
        acao: "Resolvido",
        descricao: "Chamado resolvido pelo técnico.",
      });
    });
  });

  describe("listarPorChamado", () => {
    it("deve listar os históricos de um chamado", async () => {
      const historicos = [
        {
          id: 1,
          chamadoId: 1,
          usuarioId: 2,
          acao: "Criado",
          descricao: "Chamado criado.",
        },
        {
          id: 2,
          chamadoId: 1,
          usuarioId: 2,
          acao: "Assumido",
          descricao: "Chamado assumido pelo técnico.",
        },
      ];

      jest.spyOn(service.model, "findAll").mockResolvedValue(historicos);

      const resultado = await service.listarPorChamado(1);

      expect(resultado).toEqual(historicos);

      expect(service.model.findAll).toHaveBeenCalledWith({
        where: { chamadoId: 1 },
        include: [
          {
            association: "usuario",
            attributes: ["id", "nome"],
          },
        ],
        order: [["createdAt", "ASC"]],
      });
    });

    it("deve retornar um array vazio quando não houver histórico", async () => {
      jest.spyOn(service.model, "findAll").mockResolvedValue([]);

      const resultado = await service.listarPorChamado(999);

      expect(resultado).toEqual([]);

      expect(service.model.findAll).toHaveBeenCalledWith({
        where: { chamadoId: 999 },
        include: [
          {
            association: "usuario",
            attributes: ["id", "nome"],
          },
        ],
        order: [["createdAt", "ASC"]],
      });
    });

    it("deve incluir os dados do usuário ao listar históricos", async () => {
      const historicos = [
        {
          id: 1,
          chamadoId: 1,
          usuarioId: 2,
          acao: "Criado",
          descricao: "Chamado criado.",
          usuario: {
            id: 2,
            nome: "Usuário Teste",
          },
        },
      ];

      jest.spyOn(service.model, "findAll").mockResolvedValue(historicos);

      const resultado = await service.listarPorChamado(1);

      expect(resultado[0].usuario).toEqual({
        id: 2,
        nome: "Usuário Teste",
      });
    });

    it("deve propagar erro ao listar históricos", async () => {
      const erro = new Error("Erro ao consultar o banco");

      jest.spyOn(service.model, "findAll").mockRejectedValue(erro);

      await expect(service.listarPorChamado(1)).rejects.toBe(erro);
    });
  });
});
