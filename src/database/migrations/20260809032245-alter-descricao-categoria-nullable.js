'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('categorias', 'descricao', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('categorias', 'descricao', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },
};