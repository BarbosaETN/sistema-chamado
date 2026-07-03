import app from './app.js';
import sequelize from './config/database.js';

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
    try {
        await sequelize.authenticate();

        console.log('Banco conectado.');

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

iniciarServidor();