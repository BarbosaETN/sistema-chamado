'use strict';

import STATUS from '../../constants/status.js';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('chamados', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      setor: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      status: {
        type: Sequelize.ENUM(
          'ABERTO',
          'EM ANDAMENTO',
          'AGUARDANDO',
          'RESOLVIDO',
          'FECHADO'
        ),
        allowNull: false,
        defaultValue: STATUS.ABERTO,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('chamados');
  },
};
