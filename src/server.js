import app from './app.js'
import testConnection from './database/testConnection.js';

const PORT = 3000;

app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta: ${PORT}`)
});