"use strict";

import bcrypt from "bcrypt";

import CARGO from "../../constants/cargo.js";
import STATUS_CADASTRO from "../../constants/statusCadastro.js";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const adminPassword = await bcrypt.hash("admin123", 10);
    const tecnicoPassword = await bcrypt.hash("tecnico123", 10);
    const usuarioPassword = await bcrypt.hash("usuario123", 10);

    const usuarios = [
      {
        nome: "Administrador",

        email: "admin@email.com",

        senha: adminPassword,

        cargo: CARGO.ADMIN,

        statusCadastro: STATUS_CADASTRO.APROVADO,

        createdAt: new Date(),

        updatedAt: new Date(),
      },

      {
        nome: "Carlos técnico",

        email: "tecnico@email.com",

        senha: tecnicoPassword,

        cargo: CARGO.TECNICO,

        statusCadastro: STATUS_CADASTRO.APROVADO,

        createdAt: new Date(),

        updatedAt: new Date(),
      },

      {
        nome: "João usuário",

        email: "usuario@email.com",

        senha: usuarioPassword,

        cargo: CARGO.USUARIO,

        statusCadastro: STATUS_CADASTRO.APROVADO,

        createdAt: new Date(),

        updatedAt: new Date(),
      },
    ];

    const categorias = [
      {
        nome: "Hardware",

        descricao: "Problemas relacionados a equipamentos fisicos.",

        createdAt: new Date(),

        updatedAt: new Date(),
      },

      {
        nome: "Software",

        descricao: "Problemas relacionados ao sistema do computador",

        createdAt: new Date(),

        updatedAt: new Date(),
      },

      {
        nome: "Rede",

        descricao: "Problemas de conexão e infraestrutura de rede.",

        createdAt: new Date(),

        updatedAt: new Date(),
      },

      {
        nome: "Impressoras",

        descricao: "Problemas relacionados a impressoras e suprimentos.",

        createdAt: new Date(),

        updatedAt: new Date(),
      },
    ];

    console.log("Inserindo usuários...");
    await queryInterface.bulkInsert("usuarios", usuarios);
    console.log("Usuários OK");

    console.log("Inserindo categorias...");
    await queryInterface.bulkInsert("categorias", categorias);
    console.log("Categorias OK");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categorias", null, {});
    await queryInterface.bulkDelete("usuarios", null, {});
  },
};
