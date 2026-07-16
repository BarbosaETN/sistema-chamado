'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
      await queryInterface.addColumn('chamados', 'categoriaId', {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'categorias',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
      });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.removeColumn('chamados', 'categoriaId')
  }
};
