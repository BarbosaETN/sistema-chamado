'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('comentarios', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },

        conteudo: {
            type: Sequelize.TEXT,
            allowNull: false,
        },

        chamadoId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "chamados",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },

        usuarioId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "usuarios",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },

        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },

        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
      });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('comentarios');
  }
};
