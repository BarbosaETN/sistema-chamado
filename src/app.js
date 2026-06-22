import express from "express"

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Sistema de Chamados')
});

export default app;