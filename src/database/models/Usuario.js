import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import STATUS_CADASTRO, {
  STATUS_CADASTRO_VALUES,
} from "../../constants/statusCadastro.js";

class Usuario extends Model {
  static associate(models) {
    Usuario.hasMany(models.Chamado, {
      foreignKey: "usuarioId",
      as: "chamados",
    });
  }
}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    statusCadastro: {
      type: DataTypes.ENUM(...STATUS_CADASTRO_VALUES),
      allowNull: false,
      defaultValue: STATUS_CADASTRO.PENDENTE,
      validate: {
        isIn: [STATUS_CADASTRO_VALUES],
      },
    },
  },
  {
    sequelize,
    modelName: "Usuario",
    tableName: "usuarios",
  },
);

export default Usuario;
