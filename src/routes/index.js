import express from 'express';
import chamados from './chamadosRoute.js';
import usuarios from './usuariosRoute.js';
import auth from './authRoute.js';
import categorias from './categoriasRoute.js'
import comentarios from './comentariosRoute.js';
import historicos from './historicoChamadoRoute.js'

export default app => {
    app.use(express.json());

    app.use(auth);
    app.use(usuarios);
    app.use(chamados);
    app.use(categorias)
    app.use(comentarios);
    app.use(historicos);
};