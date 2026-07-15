'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("chamados", "tecnicoId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "usuarios",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("chamados", "tecnicoId");
  }
};
