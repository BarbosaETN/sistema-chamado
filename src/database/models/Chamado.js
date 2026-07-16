import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import STATUS, { STATUS_VALUES } from '../../constants/status.js';
import PRIORIDADE, { PRIORIDADE_VALUES } from '../../constants/prioridade.js';

class Chamado extends Model {
  static associate(models) {
    Chamado.belongsTo(models.Usuario, {
      foreignKey: 'usuarioId',
      as: 'usuario',
    });

    Chamado.belongsTo(models.Usuario, {
      foreignKey: 'tecnicoId',
      as: 'tecnico',
    });

    Chamado.belongsTo(models.Categoria, {
      foreignKey: 'categoriaId',
      as: 'categoria',
    });
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

    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Chamado',
    tableName: 'chamados',
  },
);

export default Chamado;
