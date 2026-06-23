import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database.js';

const Chamado = sequelize.define(
  'Chamado',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },

    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    setor: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Aberto',
    },
  },
  {
    tableName: 'chamados',
  },
);
