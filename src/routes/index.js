import express from 'express';
import chamados from './chamadosRoute.js';
import usuarios from './usuariosRoute.js';

export default app => {
    app.use(
        express.json(),
        chamados,
        usuarios,
    );
};