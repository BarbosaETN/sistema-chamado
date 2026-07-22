'use strict';

import HISTORICO_ACAO from '../../constants/historicoAcao.js';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('historicos_chamado', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      chamadoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'chamados',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      acao: {
        type: Sequelize.ENUM(...HISTORICO_ACAO),
        allowNull: false,
      },

      descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('historicos_chamado')
  }
};
