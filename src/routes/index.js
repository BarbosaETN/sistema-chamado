import express from 'express';
import chamados from './chamadosRoute.js'

export default app => {
    app.use(
        express.json(),
        chamados,
    );
};