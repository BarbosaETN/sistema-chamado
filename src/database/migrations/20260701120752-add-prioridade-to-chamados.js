'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('chamados', 'prioridade', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Média'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('chamados', 'prioridade');
  }
};
