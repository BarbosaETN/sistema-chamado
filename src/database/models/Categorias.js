import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database.js';

class Categoria extends Model{
    static associate(models){
        Categoria.hasMany(models.Chamado, {
            foreignKey: 'categoriaId',
            as: 'chamados',
        });
    }
}

Categoria.init(
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
            unique: true,
        },

        descricao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "Categoria",
        tableName: "categorias",
    }    
);

export default Categoria;