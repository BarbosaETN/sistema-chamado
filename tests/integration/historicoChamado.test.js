import request from "supertest";
import app from "../../src/app.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import STATUS_CADASTRO from "../../src/constants/statusCadastro.js";
import models from "../../src/database/models/index.js";

let usuario;
let categoria;
let token;
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

  chamado = await models.Chamado.create({
    titulo: "Chamado para teste de histórico",
    descricao: "Chamado criado para testes de histórico.",
    setor: "TI",
    status: "ABERTO",
    prioridade: "BAIXA",
    categoriaId: categoria.id,
    usuarioId: usuario.id,
  });
});

describe("GET /chamados/:id/historico", () => {
  it("deve listar o histórico de um chamado autenticado", async () => {
    const response = await request(app)
      .get(`/chamados/${chamado.id}/historico`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it("deve rejeitar a listagem do histórico sem autenticação", async () => {
    const response = await request(app).get(
      `/chamados/${chamado.id}/historico`,
    );

    expect(response.statusCode).toBe(401);
  });

  it("deve retornar um array vazio para chamado sem histórico", async () => {
    const response = await request(app)
      .get("/chamados/999999/historico")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual([]);
  });

  it("deve incluir os dados do usuário no histórico", async () => {
    await models.HistoricoChamado.create({
      chamadoId: chamado.id,
      usuarioId: usuario.id,
      acao: "Criado",
      descricao: "Chamado criado.",
    });

    const response = await request(app)
      .get(`/chamados/${chamado.id}/historico`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.length).toBeGreaterThan(0);

    const historico = response.body.find(
      (item) => item.descricao === "Chamado criado.",
    );

    expect(historico).toBeDefined();

    expect(historico.usuario).toEqual(
      expect.objectContaining({
        id: usuario.id,
        nome: usuario.nome,
      }),
    );
  });

  it("deve retornar o histórico em ordem cronológica", async () => {
    await models.HistoricoChamado.create({
      chamadoId: chamado.id,
      usuarioId: usuario.id,
      acao: "Assumido",
      descricao: "Histórico mais recente.",
      createdAt: new Date("2026-01-01T11:00:00"),
    });

    await models.HistoricoChamado.create({
      chamadoId: chamado.id,
      usuarioId: usuario.id,
      acao: "Criado",
      descricao: "Histórico mais antigo.",
      createdAt: new Date("2026-01-01T10:00:00"),
    });

    const response = await request(app)
      .get(`/chamados/${chamado.id}/historico`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    const antigo = response.body.find(
      (item) => item.descricao === "Histórico mais antigo.",
    );

    const recente = response.body.find(
      (item) => item.descricao === "Histórico mais recente.",
    );

    expect(antigo).toBeDefined();
    expect(recente).toBeDefined();

    const indiceAntigo = response.body.indexOf(antigo);
    const indiceRecente = response.body.indexOf(recente);

    expect(indiceAntigo).toBeLessThan(indiceRecente);
  });
});
