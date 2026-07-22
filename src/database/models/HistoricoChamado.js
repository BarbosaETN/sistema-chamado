import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import { HISTORICO_ACAO_VALUES } from '../../constants/historicoAcao';

class HistoricoChamado extends Model {
    static associate(models) {
        HistoricoChamado.belongsTo(models.Chamado, {
            foreignKey: 'chamadoId',
            as: 'chamado',
        });

        HistoricoChamado.belongsTo(models.Usuario, {
            foreignKey: 'usuarioId',
            as: 'usuario'
        });
    }
}

HistoricoChamado.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        chamadoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        acao: {
            type: DataTypes.ENUM(...HISTORICO_ACAO_VALUES),
            allowNull: false,
        },

        descricao: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'HistoricoChamado',
        tableName: 'historicos_chamado',
    },
);

export default HistoricoChamado;