import request from 'supertest';
import app from '../../src/app.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import STATUS_CADASTRO from '../../src/constants/statusCadastro.js';

import models from '../../src/database/models/index.js';

let usuario;
let categoria;
let token;

let tecnico;
let tecnicoToken;
let chamado;

beforeAll(async () => {
  usuario = await models.Usuario.findOne({
    where: {
      email: 'teste@integracao.com',
    },
  });

  if (!usuario) {
    const senha = await bcrypt.hash('123456', 10);

    usuario = await models.Usuario.create({
      nome: 'Usuário Teste',
      email: 'teste@integracao.com',
      senha,
      cargo: 'USUARIO',
      statusCadastro: STATUS_CADASTRO.APROVADO,
    });
  }

  categoria = await models.Categoria.findOne({
    where: {
      nome: 'Hardware',
    },
  });

  if (!categoria) {
    categoria = await models.Categoria.create({
      nome: 'Hardware',
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
      email: 'tecnico@integracao.com',
    },
  });

  if (!tecnico) {
    const senha = await bcrypt.hash('123456', 10);

    tecnico = await models.Usuario.create({
      nome: 'Técnico Teste',
      email: 'tecnico@integracao.com',
      senha,
      cargo: 'TECNICO',
      statusCadastro: STATUS_CADASTRO.APROVADO,
    });
  }

  categoria = await models.Categoria.findOne({
    where: {
      nome: 'Hardware',
    },
  });

  if (!categoria) {
    categoria = await models.Categoria.create({
      nome: 'Hardware',
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
    titulo: 'Chamado para assumir',
    descricao: 'Chamado criado para teste de integração.',
    setor: 'TI',
    status: 'Aberto',
    categoriaId: categoria.id,
    usuarioId: tecnico.id,
  });
});

describe('GET /chamados', () => {
  it('deve listar os chamados', async () => {
    const response = await request(app).get('/chamados');

    expect(response.statusCode).toBe(200);
  });
});

describe('POST /chamados', () => {
  it('deve rejeitar a criação de chamado sem autenticação', async () => {
    const response = await request(app).post('/chamados').send({
      titulo: 'Computador não liga',
      descricao: 'O computador não está ligando.',
      setor: 'Financeiro',
      categoriaId: 1,
    });

    expect(response.statusCode).toBe(401);
  });

  it('deve criar um chamado autenticado', async () => {
    const response = await request(app)
      .post('/chamados')
      .set('Authorization', `Bearer ${token}`)
      .send({
        titulo: 'Computador não liga',
        descricao: 'O computador não está ligando.',
        setor: 'Financeiro',
        categoriaId: categoria.id,
      });

    expect(response.statusCode).toBe(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        titulo: 'Computador não liga',
        descricao: 'O computador não está ligando.',
        setor: 'Financeiro',
        status: 'ABERTO',
        categoriaId: categoria.id,
        usuarioId: usuario.id,
      }),
    );
  });
});

describe('PATCH /chamados/:id/assumir', () => {

  it('deve permitir que um técnico assuma um chamado disponível', async () => {
    const response = await request(app)
      .patch(`/chamados/${chamado.id}/assumir`)
      .set('Authorization', `Bearer ${tecnicoToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: chamado.id,
        tecnicoId: tecnico.id,
        status: 'EM ANDAMENTO',
      }),
    );
  });

  it('deve impedir que um usuário comum assuma um chamado', async () => {
    const response = await request(app)
      .patch(`/chamados/${chamado.id}/assumir`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(403);
  });

  
  it('deve rejeitar um chamado que já foi assumido', async () => {
    const response = await request(app)
      .patch(`/chamados/${chamado.id}/assumir`)
      .set('Authorization', `Bearer ${tecnicoToken}`);

    console.log(response.body);

    expect(response.statusCode).toBe(400);
    expect(response.body.erro).toBe('Este chamado já foi assumido.');
  });
});

describe('PATCH /chamados/:id/resolver', () => {
  let chamadoResolver;

  beforeAll(async () => {
    chamadoResolver = await models.Chamado.create({
      titulo: 'Chamado para resolver',
      descricao: 'Chamado criado para teste de resolução.',
      setor: 'TI',
      status: 'EM ANDAMENTO',
      categoriaId: categoria.id,
      usuarioId: usuario.id,
      tecnicoId: tecnico.id,
    });
  });

  it('deve permitir que o técnico resolva um chamado em andamento', async () => {
    const response = await request(app)
      .patch(`/chamados/${chamadoResolver.id}/resolver`)
      .set('Authorization', `Bearer ${tecnicoToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: chamadoResolver.id,
        status: 'RESOLVIDO',
      })
    );
  });

  it('deve rejeitar a resolução de um chamado que não está em andamento', async () => {
    const chamadoAberto = await models.Chamado.create({
      titulo: 'Chamado ainda aberto',
      descricao: 'Não deve poder ser resolvido.',
      setor: 'TI',
      status: 'Aberto',
      categoriaId: categoria.id,
      usuarioId: usuario.id,
    });

    const response = await request(app)
      .patch(`/chamados/${chamadoAberto.id}/resolver`)
      .set('Authorization', `Bearer ${tecnicoToken}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.erro).toBe(
      'Somente chamados em andamento podem ser resolvidos.'
    );
  });
});

describe('PATCH /chamados/:id/fechar', () => {
  let chamadoFechar;

  beforeAll(async () => {
    chamadoFechar = await models.Chamado.create({
      titulo: 'Chamado para fechar',
      descricao: 'Chamado criado para teste de fechamento.',
      setor: 'TI',
      status: 'RESOLVIDO',
      categoriaId: categoria.id,
      usuarioId: usuario.id,
      tecnicoId: tecnico.id,
    });
  });

  it('deve permitir que o técnico feche um chamado resolvido', async () => {
    const response = await request(app)
      .patch(`/chamados/${chamadoFechar.id}/fechar`)
      .set('Authorization', `Bearer ${tecnicoToken}`);

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: chamadoFechar.id,
        status: 'FECHADO',
      })
    );
  });

  it('deve rejeitar o fechamento de um chamado que não está resolvido', async () => {
    const chamadoAberto = await models.Chamado.create({
      titulo: 'Chamado ainda não resolvido',
      descricao: 'Não deve poder ser fechado.',
      setor: 'TI',
      status: 'EM ANDAMENTO',
      categoriaId: categoria.id,
      usuarioId: usuario.id,
      tecnicoId: tecnico.id,
    });

    const response = await request(app)
      .patch(`/chamados/${chamadoAberto.id}/fechar`)
      .set('Authorization', `Bearer ${tecnicoToken}`);

    expect(response.statusCode).toBe(400);

    expect(response.body.erro).toBe(
      'Somente chamados resolvidos podem ser fechados.'
    );
  });
});
