'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('categorias', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          
          nome: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
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
      });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('categorias')
  }
};
