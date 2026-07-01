import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../../config/database.js";
import STATUS, { STATUS_VALUES } from "../../constants/status.js";
import PRIORIDADE, { PRIORIDADE_VALUES } from "../../constants/prioridade.js";

const Chamado = sequelize.define(
  "Chamado",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
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
      defaultValue: STATUS.ABERTO,
      validate: {
        isIn: [STATUS_VALUES]
      }
    },

    prioridade: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: PRIORIDADE.MEDIA,
      validate: {
        isIn: [PRIORIDADE_VALUES]
      }      
    }
  },
  {
    tableName: "chamados",
  },
);

export default Chamado;
