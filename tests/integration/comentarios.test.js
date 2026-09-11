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
    titulo: "Chamado para comentários",
    descricao: "Chamado criado para testes de comentários.",
    setor: "TI",
    status: "ABERTO",
    prioridade: "BAIXA",
    categoriaId: categoria.id,
    usuarioId: usuario.id,
  });
});

describe("POST /chamados/:id/comentarios", () => {
  it("deve criar um comentário autenticado", async () => {
    const response = await request(app)
      .post(`/chamados/${chamado.id}/comentarios`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        conteudo: "Comentário criado pelo usuário.",
      });

    expect(response.statusCode).toBe(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        conteudo: "Comentário criado pelo usuário.",
        chamadoId: chamado.id,
        usuarioId: usuario.id,
      }),
    );
  });

  it("deve rejeitar a criação de comentário sem autenticação", async () => {
    const response = await request(app)
      .post(`/chamados/${chamado.id}/comentarios`)
      .send({
        conteudo: "Comentário sem autenticação.",
      });

    expect(response.statusCode).toBe(401);
  });

  it("deve rejeitar comentário vazio", async () => {
    const response = await request(app)
      .post(`/chamados/${chamado.id}/comentarios`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        conteudo: "",
      });

    expect(response.statusCode).toBe(400);

    expect(response.body.erro).toBe("O comentário é obrigatório.");
  });

  it("deve rejeitar comentário em um chamado fechado", async () => {
    const chamadoFechado = await models.Chamado.create({
      titulo: "Chamado fechado para teste",
      descricao: "Chamado utilizado para testar comentários.",
      setor: "TI",
      status: "FECHADO",
      prioridade: "BAIXA",
      categoriaId: categoria.id,
      usuarioId: usuario.id,
    });

    const response = await request(app)
      .post(`/chamados/${chamadoFechado.id}/comentarios`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        conteudo: "Tentativa de comentar em chamado fechado.",
      });

    expect(response.statusCode).toBe(400);

    expect(response.body.erro).toBe(
      "Não é possível comentar em um chamado fechado.",
    );
  });

  it("deve rejeitar comentário em chamado inexistente", async () => {
    const response = await request(app)
      .post("/chamados/999999/comentarios")
      .set("Authorization", `Bearer ${token}`)
      .send({
        conteudo: "Comentário em chamado inexistente.",
      });

    expect(response.statusCode).toBe(404);

    expect(response.body.erro).toBe("Chamado não encontrado");
  });

  it("deve registrar o comentário no histórico do chamado", async () => {
    const response = await request(app)
      .post(`/chamados/${chamado.id}/comentarios`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        conteudo: "Comentário que deve gerar histórico.",
      });

    expect(response.statusCode).toBe(201);

    const historico = await models.HistoricoChamado.findOne({
      where: {
        chamadoId: chamado.id,
        usuarioId: usuario.id,
        acao: "Comentário adicionado",
        descricao: "Comentário adicionado ao chamado.",
      },
      order: [["createdAt", "DESC"]],
    });

    expect(historico).not.toBeNull();
  });
});

describe("GET /chamados/:id/comentarios", () => {
  it("deve listar os comentários de um chamado autenticado", async () => {
    const response = await request(app)
      .get(`/chamados/${chamado.id}/comentarios`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it("deve rejeitar a listagem de comentários sem autenticação", async () => {
    const response = await request(app).get(
      `/chamados/${chamado.id}/comentarios`,
    );

    expect(response.statusCode).toBe(401);
  });

  it("deve rejeitar a listagem de comentários de um chamado inexistente", async () => {
    const response = await request(app)
      .get("/chamados/999999/comentarios")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);

    expect(response.body.erro).toBe("Chamado não encontrado");
  });

  it("deve retornar os comentários em ordem cronológica", async () => {
    await models.Comentario.create({
      conteudo: "Comentário mais antigo.",
      chamadoId: chamado.id,
      usuarioId: usuario.id,
      createdAt: new Date("2026-01-01T10:00:00"),
    });

    await models.Comentario.create({
      conteudo: "Comentário mais recente.",
      chamadoId: chamado.id,
      usuarioId: usuario.id,
      createdAt: new Date("2026-01-01T11:00:00"),
    });

    const response = await request(app)
      .get(`/chamados/${chamado.id}/comentarios`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    const comentarios = response.body;

    const indices = comentarios.map((comentario) => comentario.conteudo);

    expect(indices.indexOf("Comentário mais antigo.")).toBeLessThan(
      indices.indexOf("Comentário mais recente."),
    );
  });

  it("deve incluir os dados do autor ao listar comentários", async () => {
    const response = await request(app)
      .get(`/chamados/${chamado.id}/comentarios`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.length).toBeGreaterThan(0);

    const comentario = response.body[0];

    expect(comentario.autor).toEqual(
      expect.objectContaining({
        id: usuario.id,
        nome: usuario.nome,
      }),
    );
  });
});
