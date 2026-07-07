'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('chamados', 'usuarioId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('chamados', 'usuarioId');
  },
};