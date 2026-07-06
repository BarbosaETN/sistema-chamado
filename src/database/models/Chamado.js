import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import STATUS, { STATUS_VALUES } from "../../constants/status.js";
import PRIORIDADE, { PRIORIDADE_VALUES } from "../../constants/prioridade.js";

class Chamado extends Model {
    static associate(models) {
        // associações ficarão aqui
    }
}

Chamado.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
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
            type: DataTypes.ENUM(...STATUS_VALUES),
            allowNull: false,
            defaultValue: STATUS.ABERTO,
        },

        prioridade: {
            type: DataTypes.ENUM(...PRIORIDADE_VALUES),
            allowNull: false,
            defaultValue: PRIORIDADE.MEDIA,
        },
    },
    {
        sequelize,
        modelName: "Chamado",
        tableName: "chamados",
    }
);

export default Chamado;