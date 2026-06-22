import sequelize from "../config/database.js";

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Banco conectado com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar com o banco:', error);
    }
}

export default testConnection;