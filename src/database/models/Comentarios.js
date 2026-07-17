import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

class Comentario extends Model {
    static associate(models) {
        Comentario.belongsTo(models.Chamado, {
            foreignKey: 'chamadoId',
            as: 'chamado',
        });

        Comentario.belongsTo(models.Usuario, {
            foreignKey: 'usuarioId',
            as: 'autor',
        });
    }
}

Comentario.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        conteudo: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'O comentário não pode estar vazio.',
                },
            },
        },

        chamadoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Comentario',
        tableName: 'comentarios',
    },
);

export default Comentario;