import express from 'express';
import chamados from './chamadosRoute.js';
import usuarios from './usuariosRoute.js';
import auth from './authRoute.js';

export default app => {
    app.use(express.json());

    app.use(auth);
    app.use(usuarios);
    app.use(chamados);
};