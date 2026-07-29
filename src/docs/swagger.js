import swaggerJSDoc from "swagger-jsdoc";

import components from "./components.js";

import authPaths from "./paths/authPaths.js";
import usuarioPaths from "./paths/usuarioPaths.js";
import chamadoPaths from "./paths/chamadoPaths.js";
import categoriaPaths from "./paths/categoriaPaths.js";
import comentarioPaths from "./paths/comentarioPaths.js";
import historicoPaths from "./paths/historicoPaths.js";
import dashboardPaths from "./paths/dashboardPaths.js";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Sistema de chamados API",
      version: "1.0.0",
      description: "API para gerenciamento de chamados de suporte técnico",
    },

    servers: [
      {
        url: "https//localhost:3000",
        description: "Servidor local",
      },
    ],

    components,

    tags: [
      {
        name: "Auth",
        description: "Autenticação",
      },
      {
        name: 'Usuários',
        description: 'Gerenciamento de usuários',
      },
      {
        name: 'Chamados',
        description: 'Gerenciamento de chamados',
      },
      {
        name: 'Categorias',
        description: 'Gerenciamento de categorias'
      },
      {
        name: 'Comentários',
        description: 'Comentários dos chamados'
      },
      {
        name: 'Histórico',
        description: 'Histórico dos chamados'
      },
      {
        name: 'Dashboard',
        description: 'indicadores do sistema'
      },
    ],

    paths: {
        ...authPaths,
        ...usuarioPaths,
        ...chamadoPaths,
        ...categoriaPaths,
        ...comentarioPaths,
        ...historicoPaths,
        ...dashboardPaths,
    }
  },

  apis: [],
};

export default swaggerJSDoc(options);