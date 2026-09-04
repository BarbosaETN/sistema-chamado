import request from "supertest";
import app from "../../src/app.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import STATUS_CADASTRO from "../../src/constants/statusCadastro.js";
import { Op } from "sequelize";

import models from "../../src/database/models/index.js";

let usuario;
let categoria;
let token;

let tecnico;
let tecnicoToken;
let chamado;

beforeAll(async () => {
  usuario = await models.Usuario.findOne({
    where: {
      email: "teste@integracao.com",
    },
  });

  if (!usuario) {
    const senha = await bcrypt.hash("123456", 10);

    usuario = await models.Usuario.create({
      nome: "Usuário Teste",
      email: "teste@integracao.com",
      senha,
      cargo: "USUARIO",
      statusCadastro: STATUS_CADASTRO.APROVADO,
    });
  }

  categoria = await models.Categoria.findOne({
    where: {
      nome: "Hardware",
    },
  });

  if (!categoria) {
    categoria = await models.Categoria.create({
      nome: "Hardware",
    });
  }

  token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      cargo: usuario.cargo,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  tecnico = await models.Usuario.findOne({
    where: {
      email: "tecnico@integracao.com",
    },
  });

  if (!tecnico) {
    const senha = await bcrypt.hash("123456", 10);

    tecnico = await models.Usuario.create({
      nome: "Técnico Teste",
      email: "tecnico@integracao.com",
      senha,
      cargo: "TECNICO",
      statusCadastro: STATUS_CADASTRO.APROVADO,
    });
  }

  categoria = await models.Categoria.findOne({
    where: {
      nome: "Hardware",
    },
  });

  if (!categoria) {
    categoria = await models.Categoria.create({
      nome: "Hardware",
    });
  }

  tecnicoToken = jwt.sign(
    {
      id: tecnico.id,
      email: tecnico.email,
      cargo: tecnico.cargo,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  chamado = await models.Chamado.create({
    titulo: "Chamado para assumir",
    descricao: "Chamado criado para teste de integração.",
    setor: "TI",
    status: "Aberto",
    categoriaId: categoria.id,
    usuarioId: tecnico.id,
  });
});

describe("GET /chamados", () => {
  it("deve listar os chamados", async () => {
    const response = await request(app).get("/chamados");

    expect(response.statusCode).toBe(200);
  });

  describe("filtros", () => {
    it("deve filtrar chamados por status", async () => {
      const response = await request(app).get("/chamados").query({
        status: "ABERTO",
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.chamados.length).toBeGreaterThan(0);

      response.body.chamados.forEach((chamado) => {
        expect(chamado.status).toBe("ABERTO");
      });
    });

    it("deve filtrar chamados por prioridade", async () => {
      const chamadoAlta = await models.Chamado.create({
        titulo: "Chamado prioridade alta",
        descricao: "Chamado criado para testar filtro de prioridade.",
        setor: "TI",
        status: "Aberto",
        prioridade: "ALTA",
        categoriaId: categoria.id,
        usuarioId: usuario.id,
      });

      const response = await request(app).get("/chamados").query({
        prioridade: "ALTA",
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.chamados.length).toBeGreaterThan(0);

      response.body.chamados.forEach((chamado) => {
        expect(chamado.prioridade).toBe("ALTA");
      });
    });

    it("deve filtrar chamados por categoria", async () => {
      await models.Chamado.create({
        titulo: "Chamado da categoria de teste",
        descricao: "Chamado criado para testar filtro por categoria.",
        setor: "TI",
        status: "ABERTO",
        categoriaId: categoria.id,
        usuarioId: usuario.id,
      });

      const response = await request(app).get("/chamados").query({
        categoriaId: categoria.id,
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.chamados.length).toBeGreaterThan(0);

      response.body.chamados.forEach((chamado) => {
        expect(chamado.categoriaId).toBe(categoria.id);
      });
    });

    it("deve filtrar chamados por técnico", async () => {
      await models.Chamado.create({
        titulo: "Chamado do técnico de teste",
        descricao: "Chamado criado para testar filtro por técnico.",
        setor: "TI",
        status: "EM ANDAMENTO",
        categoriaId: categoria.id,
        usuarioId: usuario.id,
        tecnicoId: tecnico.id,
      });

      const response = await request(app).get("/chamados").query({
        tecnicoId: tecnico.id,
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.chamados.length).toBeGreaterThan(0);

      response.body.chamados.forEach((chamado) => {
        expect(chamado.tecnicoId).toBe(tecnico.id);
      });
    });

    it("deve buscar chamados pelo título", async () => {
      await models.Chamado.create({
        titulo: "Computador com tela azul",
        descricao: "Problema relacionado ao equipamento.",
        setor: "TI",
        status: "ABERTO",
        categoriaId: categoria.id,
        usuarioId: usuario.id,
      });

      const response = await request(app).get("/chamados").query({
        busca: "Computador com tela azul",
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.chamados.length).toBeGreaterThan(0);

      expect(
        response.body.chamados.some(
          (chamado) => chamado.titulo === "Computador com tela azul",
        ),
      ).toBe(true);
    });

    it("deve buscar chamados pela descrição", async () => {
      await models.Chamado.create({
        titulo: "Problema no equipamento",
        descricao: "O computador apresenta tela azul constantemente.",
        setor: "TI",
        status: "ABERTO",
        categoriaId: categoria.id,
        usuarioId: usuario.id,
      });

      const response = await request(app).get("/chamados").query({
        busca: "tela azul constantemente",
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.chamados.length).toBeGreaterThan(0);

      expect(
        response.body.chamados.some(
          (chamado) =>
            chamado.descricao ===
            "O computador apresenta tela azul constantemente.",
        ),
      ).toBe(true);
    });

    it("deve paginar os chamados corretamente", async () => {
      await models.Chamado.bulkCreate([
        {
          titulo: "Chamado paginação 1",
          descricao: "Teste de paginação.",
          setor: "TI",
          status: "ABERTO",
          categoriaId: categoria.id,
          usuarioId: usuario.id,
        },
        {
          titulo: "Chamado paginação 2",
          descricao: "Teste de paginação.",
          setor: "TI",
          status: "ABERTO",
          categoriaId: categoria.id,
          usuarioId: usuario.id,
        },
        {
          titulo: "Chamado paginação 3",
          descricao: "Teste de paginação.",
          setor: "TI",
          status: "ABERTO",
          categoriaId: categoria.id,
          usuarioId: usuario.id,
        },
      ]);

      const response = await request(app).get("/chamados").query({
        page: 1,
        limit: 2,
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.paginaAtual).toBe(1);
      expect(response.body.limite).toBe(2);

      expect(response.body.chamados).toHaveLength(2);

      expect(response.body.total).toBeGreaterThanOrEqual(3);
      expect(response.body.totalPaginas).toBeGreaterThanOrEqual(2);
    });

    it("deve retornar a segunda página corretamente", async () => {
      const primeiraPagina = await request(app).get("/chamados").query({
        page: 1,
        limit: 2,
      });

      const segundaPagina = await request(app).get("/chamados").query({
        page: 2,
        limit: 2,
      });

      expect(primeiraPagina.statusCode).toBe(200);
      expect(segundaPagina.statusCode).toBe(200);

      expect(primeiraPagina.body.paginaAtual).toBe(1);
      expect(segundaPagina.body.paginaAtual).toBe(2);

      expect(primeiraPagina.body.limite).toBe(2);
      expect(segundaPagina.body.limite).toBe(2);

      expect(segundaPagina.body.chamados).toHaveLength(2);

      const idsPrimeiraPagina = primeiraPagina.body.chamados.map(
        (chamado) => chamado.id,
      );

      const idsSegundaPagina = segundaPagina.body.chamados.map(
        (chamado) => chamado.id,
      );

      expect(idsPrimeiraPagina).not.toEqual(
        expect.arrayContaining(idsSegundaPagina),
      );
    });

    it("deve normalizar uma página inválida para 1", async () => {
      const response = await request(app).get("/chamados").query({
        page: 0,
        limit: 2,
      });

      expect(response.statusCode).toBe(200);
      expect(response.body.paginaAtual).toBe(1);
    });

    it("deve normalizar uma página negativa para 1", async () => {
      const response = await request(app).get("/chamados").query({
        page: -5,
        limit: 2,
      });

      expect(response.statusCode).toBe(200);
      expect(response.body.paginaAtual).toBe(1);
    });

    it("deve usar o limite padrão quando limit for 0", async () => {
      const response = await request(app).get("/chamados").query({
        page: 1,
        limit: 0,
      });

      expect(response.statusCode).toBe(200);
      expect(response.body.limite).toBe(10);
    });

    it("deve usar o limite padrão quando limit for negativo", async () => {
      const response = await request(app).get("/chamados").query({
        page: 1,
        limit: -5,
      });

      expect(response.statusCode).toBe(200);
      expect(response.body.limite).toBe(1);
    });

    it("deve limitar o máximo de resultados a 100", async () => {
      const response = await request(app).get("/chamados").query({
        page: 1,
        limit: 999,
      });

      expect(response.statusCode).toBe(200);
      expect(response.body.limite).toBe(100);
    });

    it("deve ordenar chamados por título em ordem crescente", async () => {
      await models.Chamado.create({
        titulo: "000 Chamado",
        descricao: "Teste de ordenação crescente.",
        setor: "TI",
        status: "ABERTO",
        prioridade: "ALTA",
        usuarioId: usuario.id,
        categoriaId: categoria.id,
      });

      await models.Chamado.create({
        titulo: "001 Chamado",
        descricao: "Teste de ordenação crescente.",
        setor: "TI",
        status: "ABERTO",
        prioridade: "ALTA",
        usuarioId: usuario.id,
        categoriaId: categoria.id,
      });

      const response = await request(app).get("/chamados").query({
        sortBy: "titulo",
        order: "ASC",
        limit: 100,
      });

      expect(response.statusCode).toBe(200);

      const titulos = response.body.chamados.map((chamado) => chamado.titulo);

      const indice000 = titulos.indexOf("000 Chamado");
      const indice001 = titulos.indexOf("001 Chamado");

      expect(indice000).toBeGreaterThanOrEqual(0);
      expect(indice001).toBeGreaterThanOrEqual(0);

      expect(indice000).toBeLessThan(indice001);
    });

    it("deve ordenar chamados por título em ordem decrescente", async () => {
      await models.Chamado.create({
        titulo: "YYY Chamado",
        descricao: "Teste de ordenação",
        setor: "TI",
        status: "ABERTO",
        prioridade: "ALTA",
        usuarioId: usuario.id,
        categoriaId: categoria.id,
      });

      await models.Chamado.create({
        titulo: "ZZZ Chamado",
        descricao: "Teste de ordenação",
        setor: "TI",
        status: "ABERTO",
        prioridade: "ALTA",
        usuarioId: usuario.id,
        categoriaId: categoria.id,
      });

      const response = await request(app).get("/chamados").query({
        sortBy: "titulo",
        order: "DESC",
        limit: 100,
      });

      expect(response.statusCode).toBe(200);

      const titulos = response.body.chamados.map((chamado) => chamado.titulo);

      const indiceYYY = titulos.indexOf("YYY Chamado");
      const indiceZZZ = titulos.indexOf("ZZZ Chamado");

      expect(indiceYYY).toBeGreaterThanOrEqual(0);
      expect(indiceZZZ).toBeGreaterThanOrEqual(0);

      expect(indiceZZZ).toBeLessThan(indiceYYY);
    });

    it("deve usar createdAt quando sortBy for inválido", async () => {
      const chamadoMaisAntigo = await models.Chamado.create({
        titulo: "Teste fallback antigo",
        descricao: "Teste de ordenação padrão.",
        setor: "TI",
        status: "ABERTO",
        categoriaId: categoria.id,
        usuarioId: usuario.id,
        createdAt: new Date("2000-01-01T00:00:00.000Z"),
      });

      const chamadoMaisNovo = await models.Chamado.create({
        titulo: "Teste fallback novo",
        descricao: "Teste de ordenação padrão.",
        setor: "TI",
        status: "ABERTO",
        categoriaId: categoria.id,
        usuarioId: usuario.id,
        createdAt: new Date("2000-01-02T00:00:00.000Z"),
      });

      const response = await request(app).get("/chamados").query({
        sortBy: "banana",
        order: "ASC",
        limit: 100,
      });

      expect(response.statusCode).toBe(200);

      const chamados = response.body.chamados;

      const indiceAntigo = chamados.findIndex(
        (chamado) => chamado.id === chamadoMaisAntigo.id,
      );

      const indiceNovo = chamados.findIndex(
        (chamado) => chamado.id === chamadoMaisNovo.id,
      );

      expect(indiceAntigo).toBeGreaterThanOrEqual(0);
      expect(indiceNovo).toBeGreaterThanOrEqual(0);

      expect(indiceAntigo).toBeLessThan(indiceNovo);
    });

    it("deve usar DESC quando order for inválido", async () => {
      await models.Chamado.create({
        titulo: "YYY Chamado",
        descricao: "Teste de ordenação",
        setor: "TI",
        status: "ABERTO",
        prioridade: "ALTA",
        usuarioId: usuario.id,
        categoriaId: categoria.id,
      });

      await models.Chamado.create({
        titulo: "ZZZ Chamado",
        descricao: "Teste de ordenação",
        setor: "TI",
        status: "ABERTO",
        prioridade: "ALTA",
        usuarioId: usuario.id,
        categoriaId: categoria.id,
      });

      const response = await request(app).get("/chamados").query({
        sortBy: "titulo",
        order: "qualquer-coisa",
        limit: 100,
      });

      expect(response.statusCode).toBe(200);

      const titulos = response.body.chamados.map((chamado) => chamado.titulo);

      const indiceYYY = titulos.indexOf("YYY Chamado");
      const indiceZZZ = titulos.indexOf("ZZZ Chamado");

      expect(indiceYYY).toBeGreaterThanOrEqual(0);
      expect(indiceZZZ).toBeGreaterThanOrEqual(0);

      expect(indiceZZZ).toBeLessThan(indiceYYY);
    });

    it("deve filtrar chamados por status e prioridade", async () => {
      const response = await request(app).get("/chamados").query({
        status: "ABERTO",
        prioridade: "ALTA",
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.chamados.length).toBeGreaterThan(0);

      response.body.chamados.forEach((chamado) => {
        expect(chamado.status).toBe("ABERTO");
        expect(chamado.prioridade).toBe("ALTA");
      });
    });

    it("deve combinar filtro, paginação e ordenação", async () => {
      const response = await request(app).get("/chamados").query({
        status: "ABERTO",
        page: 1,
        limit: 5,
        sortBy: "titulo",
        order: "ASC",
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.paginaAtual).toBe(1);
      expect(response.body.limite).toBe(5);

      expect(response.body.chamados.length).toBeLessThanOrEqual(5);

      response.body.chamados.forEach((chamado) => {
        expect(chamado.status).toBe("ABERTO");
      });

      const titulos = response.body.chamados.map((chamado) => chamado.titulo);

      const titulosOrdenados = [...titulos].sort((a, b) => a.localeCompare(b));

      expect(titulos).toEqual(titulosOrdenados);
    });

    it("deve rejeitar um status inválido no filtro", async () => {
      const response = await request(app).get("/chamados").query({
        status: "STATUS_INVALIDO",
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.erro).toBe("Status inválido");
    });

    it("deve rejeitar uma prioridade inválida no filtro", async () => {
      const response = await request(app).get("/chamados").query({
        prioridade: "PRIORIDADE_INVALIDA",
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.erro).toBe("Prioridade inválida");
    });

    it("deve rejeitar um categoriaId inválido no filtro", async () => {
      const response = await request(app).get("/chamados").query({
        categoriaId: "abc",
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.erro).toBe("Categoria inválida");
    });

    it("deve rejeitar categoriaId igual a 0 no filtro", async () => {
      const response = await request(app).get("/chamados").query({
        categoriaId: 0,
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.erro).toBe("Categoria inválida");
    });

    it("deve rejeitar categoriaId igual a -1 no filtro", async () => {
      const response = await request(app).get("/chamados").query({
        categoriaId: -1,
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.erro).toBe("Categoria inválida");
    });

    it("deve rejeitar um tecnicoId inválido no filtro", async () => {
      const response = await request(app).get("/chamados").query({
        tecnicoId: "abc",
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.erro).toBe("Técnico inválido");
    });

    it("deve rejeitar um tecnicoId igual a 0 no filtro", async () => {
      const response = await request(app).get("/chamados").query({
        tecnicoId: 0,
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.erro).toBe("Técnico inválido");
    });

    it("deve rejeitar um tecnicoId igual a -1 no filtro", async () => {
      const response = await request(app).get("/chamados").query({
        tecnicoId: -1,
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.erro).toBe("Técnico inválido");
    });

    it("deve ignorar uma busca vazia", async () => {
      const response = await request(app).get("/chamados").query({
        busca: "",
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.chamados.length).toBeGreaterThan(0);
    });

    it("deve ignorar uma busca contendo apenas espaços", async () => {
      const response = await request(app).get("/chamados").query({
        busca: "   ",
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.chamados.length).toBeGreaterThan(0);
    });

    it("deve ignorar espaços antes e depois da busca", async () => {
      const response = await request(app).get("/chamados").query({
        busca: "   Chamado prioridade alta   ",
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.chamados.length).toBeGreaterThan(0);

      response.body.chamados.forEach((chamado) => {
        const termo = "Chamado prioridade alta";

        const encontradoNoTitulo = chamado.titulo.includes(termo);

        const encontradoNaDescricao = chamado.descricao.includes(termo);

        expect(encontradoNoTitulo || encontradoNaDescricao).toBe(true);
      });
    });
  });

  describe("busca combinada", () => {
    let categoriaBusca;

    beforeAll(async () => {
      await models.Chamado.create({
        titulo: "Busca Combinada Status Aberto",
        descricao: "Registro para teste.",
        setor: "TI",
        status: "ABERTO",
        prioridade: "BAIXA",
        usuarioId: usuario.id,
        categoriaId: categoria.id,
      });

      await models.Chamado.create({
        titulo: "Busca Combinada Status Fechado",
        descricao: "Registro para teste.",
        setor: "TI",
        status: "FECHADO",
        prioridade: "BAIXA",
        usuarioId: usuario.id,
        categoriaId: categoria.id,
      });

      await models.Chamado.create({
        titulo: "Busca Combinada Prioridade Alta",
        descricao: "Registro para teste.",
        setor: "TI",
        status: "ABERTO",
        prioridade: "ALTA",
        usuarioId: usuario.id,
        categoriaId: categoria.id,
      });

      await models.Chamado.create({
        titulo: "Busca Combinada Prioridade Baixa",
        descricao: "Registro para teste.",
        setor: "TI",
        status: "ABERTO",
        prioridade: "BAIXA",
        usuarioId: usuario.id,
        categoriaId: categoria.id,
      });

      [categoriaBusca] = await models.Categoria.findOrCreate({
        where: {
          nome: "Categoria Busca Combinada",
        },
        defaults: {
          nome: "Categoria Busca Combinada",
        },
      });

      await models.Chamado.create({
        titulo: "Busca Combinada Categoria",
        descricao: "Chamado da categoria correta.",
        setor: "TI",
        status: "ABERTO",
        prioridade: "MEDIA",
        usuarioId: usuario.id,
        categoriaId: categoriaBusca.id,
      });

      await models.Chamado.create({
        titulo: "Busca Combinada Categoria Alternativa",
        descricao: "Chamado de outra categoria.",
        setor: "TI",
        status: "ABERTO",
        prioridade: "MEDIA",
        usuarioId: usuario.id,
        categoriaId: categoria.id,
      });

      await models.Chamado.create({
        titulo: "Busca Combinada Tecnico",
        descricao: "Chamado atendido pelo técnico correto.",
        setor: "TI",
        status: "EM ANDAMENTO",
        prioridade: "ALTA",
        usuarioId: usuario.id,
        tecnicoId: tecnico.id,
        categoriaId: categoria.id,
      });

      await models.Chamado.destroy({
        where: {
          titulo: {
            [Op.like]: "Busca Paginacao%",
          },
        },
      });

      await models.Chamado.bulkCreate([
        {
          titulo: "Busca Paginacao 1",
          descricao: "Registro para paginação.",
          setor: "TI",
          status: "ABERTO",
          prioridade: "BAIXA",
          usuarioId: usuario.id,
          categoriaId: categoria.id,
        },
        {
          titulo: "Busca Paginacao 2",
          descricao: "Registro para paginação.",
          setor: "TI",
          status: "ABERTO",
          prioridade: "BAIXA",
          usuarioId: usuario.id,
          categoriaId: categoria.id,
        },
        {
          titulo: "Busca Paginacao 3",
          descricao: "Registro para paginação.",
          setor: "TI",
          status: "ABERTO",
          prioridade: "BAIXA",
          usuarioId: usuario.id,
          categoriaId: categoria.id,
        },
      ]);

      await models.Chamado.bulkCreate([
        {
          titulo: "000 Busca Ordenacao",
          descricao: "Registro para ordenação.",
          setor: "TI",
          status: "ABERTO",
          prioridade: "BAIXA",
          usuarioId: usuario.id,
          categoriaId: categoria.id,
        },
        {
          titulo: "999 Busca Ordenacao",
          descricao: "Registro para ordenação.",
          setor: "TI",
          status: "ABERTO",
          prioridade: "BAIXA",
          usuarioId: usuario.id,
          categoriaId: categoria.id,
        },
      ]);

      await models.Chamado.destroy({
        where: {
          titulo: {
            [Op.like]: "%Busca Completa%",
          },
        },
      });

      await models.Chamado.bulkCreate([
        {
          titulo: "AAA Busca Completa",
          descricao: "Registro completo 1.",
          setor: "TI",
          status: "ABERTO",
          prioridade: "ALTA",
          usuarioId: usuario.id,
          categoriaId: categoria.id,
        },
        {
          titulo: "ZZZ Busca Completa",
          descricao: "Registro completo 2.",
          setor: "TI",
          status: "ABERTO",
          prioridade: "ALTA",
          usuarioId: usuario.id,
          categoriaId: categoria.id,
        },
      ]);
    });

    it("deve combinar busca e filtro por status", async () => {
      const response = await request(app).get("/chamados").query({
        busca: "Busca Combinada Status",
        status: "ABERTO",
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.chamados.length).toBeGreaterThan(0);

      response.body.chamados.forEach((chamado) => {
        const encontrado =
          chamado.titulo.includes("Busca Combinada Status") ||
          chamado.descricao.includes("Busca Combinada Status");

        expect(encontrado).toBe(true);
        expect(chamado.status).toBe("ABERTO");
      });
    });

    it("deve combinar busca e filtro por prioridade", async () => {
      const response = await request(app).get("/chamados").query({
        busca: "Busca Combinada Prioridade",
        prioridade: "ALTA",
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.chamados.length).toBeGreaterThan(0);

      response.body.chamados.forEach((chamado) => {
        const encontrado =
          chamado.titulo.includes("Busca Combinada Prioridade") ||
          chamado.descricao.includes("Busca Combinada Prioridade");

        expect(encontrado).toBe(true);
        expect(chamado.prioridade).toBe("ALTA");
      });
    });

    it("deve combinar busca e filtro por categoria", async () => {
      const response = await request(app).get("/chamados").query({
        busca: "Busca Combinada Categoria",
        categoriaId: categoriaBusca.id,
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.chamados.length).toBeGreaterThan(0);

      response.body.chamados.forEach((chamado) => {
        const encontrado =
          chamado.titulo.includes("Busca Combinada Categoria") ||
          chamado.descricao.includes("Busca Combinada Categoria");

        expect(encontrado).toBe(true);
        expect(chamado.categoriaId).toBe(categoriaBusca.id);
      });
    });

    it("deve combinar busca e filtro por técnico", async () => {
      const response = await request(app).get("/chamados").query({
        busca: "Busca Combinada Tecnico",
        tecnicoId: tecnico.id,
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.chamados.length).toBeGreaterThan(0);

      response.body.chamados.forEach((chamado) => {
        const encontrado =
          chamado.titulo.includes("Busca Combinada Tecnico") ||
          chamado.descricao.includes("Busca Combinada Tecnico");

        expect(encontrado).toBe(true);
        expect(chamado.tecnicoId).toBe(tecnico.id);
      });
    });

    it("deve combinar busca e paginação na primeira página", async () => {
      const response = await request(app).get("/chamados").query({
        busca: "Busca Paginacao",
        page: 1,
        limit: 2,
        sortBy: "titulo",
        order: "ASC",
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.chamados).toHaveLength(2);

      expect(response.body.paginaAtual).toBe(1);
      expect(response.body.limite).toBe(2);

      response.body.chamados.forEach((chamado) => {
        expect(chamado.titulo).toContain("Busca Paginacao");
      });
    });

    it("deve combinar busca e paginação na segunda página", async () => {
      const response = await request(app).get("/chamados").query({
        busca: "Busca Paginacao",
        page: 2,
        limit: 2,
        sortBy: "titulo",
        order: "ASC",
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.chamados).toHaveLength(1);

      expect(response.body.paginaAtual).toBe(2);
      expect(response.body.limite).toBe(2);

      expect(response.body.chamados[0].titulo).toBe("Busca Paginacao 3");
    });

    it("deve combinar busca e ordenação crescente", async () => {
      const response = await request(app).get("/chamados").query({
        busca: "Busca Ordenacao",
        sortBy: "titulo",
        order: "ASC",
        limit: 100,
      });

      expect(response.statusCode).toBe(200);

      const titulos = response.body.chamados.map((chamado) => chamado.titulo);

      const indice000 = titulos.indexOf("000 Busca Ordenacao");

      const indice999 = titulos.indexOf("999 Busca Ordenacao");

      expect(indice000).toBeGreaterThanOrEqual(0);
      expect(indice999).toBeGreaterThanOrEqual(0);

      expect(indice000).toBeLessThan(indice999);
    });

    it("deve combinar busca e ordenação decrescente", async () => {
      const response = await request(app).get("/chamados").query({
        busca: "Busca Ordenacao",
        sortBy: "titulo",
        order: "DESC",
        limit: 100,
      });

      expect(response.statusCode).toBe(200);

      const titulos = response.body.chamados.map((chamado) => chamado.titulo);

      const indice000 = titulos.indexOf("000 Busca Ordenacao");

      const indice999 = titulos.indexOf("999 Busca Ordenacao");

      expect(indice000).toBeGreaterThanOrEqual(0);
      expect(indice999).toBeGreaterThanOrEqual(0);

      expect(indice999).toBeLessThan(indice000);
    });

    it("deve combinar busca, filtros, paginação e ordenação", async () => {
      const response = await request(app).get("/chamados").query({
        busca: "Busca Completa",
        status: "ABERTO",
        prioridade: "ALTA",
        page: 1,
        limit: 2,
        sortBy: "titulo",
        order: "ASC",
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.paginaAtual).toBe(1);
      expect(response.body.limite).toBe(2);

      expect(response.body.chamados.length).toBeGreaterThan(0);

      response.body.chamados.forEach((chamado) => {
        const encontrado =
          chamado.titulo.includes("Busca Completa") ||
          chamado.descricao.includes("Busca Completa");

        expect(encontrado).toBe(true);
        expect(chamado.status).toBe("ABERTO");
        expect(chamado.prioridade).toBe("ALTA");
      });

      const titulos = response.body.chamados.map((chamado) => chamado.titulo);

      const indiceAAA = titulos.indexOf("AAA Busca Completa");

      const indiceZZZ = titulos.indexOf("ZZZ Busca Completa");

      expect(indiceAAA).toBeGreaterThanOrEqual(0);
      expect(indiceZZZ).toBeGreaterThanOrEqual(0);

      expect(indiceAAA).toBeLessThan(indiceZZZ);
    });

    it("deve retornar lista vazia ao combinar busca e status sem resultados", async () => {
      const response = await request(app).get("/chamados").query({
        busca: "Busca Combinada Status Aberto",
        status: "FECHADO",
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.total).toBe(0);
      expect(response.body.chamados).toHaveLength(0);
    });

    it("deve retornar lista vazia ao combinar busca e prioridade sem resultados", async () => {
      const response = await request(app).get("/chamados").query({
        busca: "Busca Combinada Prioridade Alta",
        prioridade: "BAIXA",
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.total).toBe(0);
      expect(response.body.chamados).toHaveLength(0);
    });

    it("deve retornar lista vazia ao combinar busca e categoria sem resultados", async () => {
      const response = await request(app).get("/chamados").query({
        busca: "Busca Combinada Categoria",
        categoriaId: categoria.id,
      });

      expect(response.statusCode).toBe(200);

      const titulos = response.body.chamados.map((chamado) => chamado.titulo);

      expect(titulos.includes("Busca Combinada Categoria")).toBe(false);
    });

    it("deve retornar lista vazia ao combinar busca e técnico sem resultados", async () => {
      const response = await request(app).get("/chamados").query({
        busca: "Busca Combinada Tecnico",
        tecnicoId: usuario.id,
      });

      expect(response.statusCode).toBe(200);

      expect(response.body.total).toBe(0);
      expect(response.body.chamados).toHaveLength(0);
    });
  });
});

describe("POST /chamados", () => {
  it("deve rejeitar a criação de chamado sem autenticação", async () => {
    const response = await request(app).post("/chamados").send({
      titulo: "Computador não liga",
      descricao: "O computador não está ligando.",
      setor: "Financeiro",
      categoriaId: 1,
    });

    expect(response.statusCode).toBe(401);
  });

  it("deve criar um chamado autenticado", async () => {
    const response = await request(app)
      .post("/chamados")
      .set("Authorization", `Bearer ${token}`)
      .send({
        titulo: "Computador não liga",
        descricao: "O computador não está ligando.",
        setor: "Financeiro",
        categoriaId: categoria.id,
      });

    expect(response.statusCode).toBe(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        titulo: "Computador não liga",
        descricao: "O computador não está ligando.",
        setor: "Financeiro",
        status: "ABERTO",
        categoriaId: categoria.id,
        usuarioId: usuario.id,
      }),
    );
  });
});

describe("PATCH /chamados/:id/assumir", () => {
  it("deve permitir que um técnico assuma um chamado disponível", async () => {
    const response = await request(app)
      .patch(`/chamados/${chamado.id}/assumir`)
      .set("Authorization", `Bearer ${tecnicoToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: chamado.id,
        tecnicoId: tecnico.id,
        status: "EM ANDAMENTO",
      }),
    );
  });

  it("deve impedir que um usuário comum assuma um chamado", async () => {
    const response = await request(app)
      .patch(`/chamados/${chamado.id}/assumir`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(403);
  });

  it("deve rejeitar um chamado que já foi assumido", async () => {
    const response = await request(app)
      .patch(`/chamados/${chamado.id}/assumir`)
      .set("Authorization", `Bearer ${tecnicoToken}`);

    console.log(response.body);

    expect(response.statusCode).toBe(400);
    expect(response.body.erro).toBe("Este chamado já foi assumido.");
  });
});

describe("PATCH /chamados/:id/resolver", () => {
  let chamadoResolver;

  beforeAll(async () => {
    chamadoResolver = await models.Chamado.create({
      titulo: "Chamado para resolver",
      descricao: "Chamado criado para teste de resolução.",
      setor: "TI",
      status: "EM ANDAMENTO",
      categoriaId: categoria.id,
      usuarioId: usuario.id,
      tecnicoId: tecnico.id,
    });
  });

  it("deve permitir que o técnico resolva um chamado em andamento", async () => {
    const response = await request(app)
      .patch(`/chamados/${chamadoResolver.id}/resolver`)
      .set("Authorization", `Bearer ${tecnicoToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: chamadoResolver.id,
        status: "RESOLVIDO",
      }),
    );
  });

  it("deve rejeitar a resolução de um chamado que não está em andamento", async () => {
    const chamadoAberto = await models.Chamado.create({
      titulo: "Chamado ainda aberto",
      descricao: "Não deve poder ser resolvido.",
      setor: "TI",
      status: "Aberto",
      categoriaId: categoria.id,
      usuarioId: usuario.id,
    });

    const response = await request(app)
      .patch(`/chamados/${chamadoAberto.id}/resolver`)
      .set("Authorization", `Bearer ${tecnicoToken}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.erro).toBe(
      "Somente chamados em andamento podem ser resolvidos.",
    );
  });
});

describe("PATCH /chamados/:id/fechar", () => {
  let chamadoFechar;

  beforeAll(async () => {
    chamadoFechar = await models.Chamado.create({
      titulo: "Chamado para fechar",
      descricao: "Chamado criado para teste de fechamento.",
      setor: "TI",
      status: "RESOLVIDO",
      categoriaId: categoria.id,
      usuarioId: usuario.id,
      tecnicoId: tecnico.id,
    });
  });

  it("deve permitir que o técnico feche um chamado resolvido", async () => {
    const response = await request(app)
      .patch(`/chamados/${chamadoFechar.id}/fechar`)
      .set("Authorization", `Bearer ${tecnicoToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: chamadoFechar.id,
        status: "FECHADO",
      }),
    );
  });

  it("deve rejeitar o fechamento de um chamado que não está resolvido", async () => {
    const chamadoAberto = await models.Chamado.create({
      titulo: "Chamado ainda não resolvido",
      descricao: "Não deve poder ser fechado.",
      setor: "TI",
      status: "EM ANDAMENTO",
      categoriaId: categoria.id,
      usuarioId: usuario.id,
      tecnicoId: tecnico.id,
    });

    const response = await request(app)
      .patch(`/chamados/${chamadoAberto.id}/fechar`)
      .set("Authorization", `Bearer ${tecnicoToken}`);

    expect(response.statusCode).toBe(400);

    expect(response.body.erro).toBe(
      "Somente chamados resolvidos podem ser fechados.",
    );
  });
});

describe("GET /chamados/:id", () => {
  it("deve retornar um chamado pelo id", async () => {
    const response = await request(app).get(`/chamados/${chamado.id}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: chamado.id,
        titulo: chamado.titulo,
        descricao: chamado.descricao,
      }),
    );
  });

  it("deve retornar 404 ao buscar um chamado inexistente", async () => {
    const response = await request(app).get("/chamados/999999");

    expect(response.statusCode).toBe(404);

    expect(response.body.erro).toBe("Chamado não encontrado");
  });
});

describe("PUT /chamados/:id", () => {
  it("deve atualizar um chamado corretamente", async () => {
    const chamado = await models.Chamado.create({
      titulo: "Chamado antes da atualização",
      descricao: "Descrição antiga.",
      setor: "TI",
      status: "ABERTO",
      categoriaId: categoria.id,
      usuarioId: usuario.id,
    });

    const response = await request(app).put(`/chamados/${chamado.id}`).send({
      titulo: "Chamado atualizado",
      descricao: "Descrição atualizada.",
    });

    expect(response.statusCode).toBe(200);

    expect(response.body.titulo).toBe("Chamado atualizado");
    expect(response.body.descricao).toBe("Descrição atualizada.");
  });
});
