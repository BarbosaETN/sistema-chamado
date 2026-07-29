export default {
  '/usuarios': {
    get: {
      tags: ['Usuários'],

      summary: 'Lista todos os usuários',

      description:
        'Retorna uma lista com todos os usuários cadastrados.',

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: 'Lista de usuários retornada com sucesso.',
        },

        401: {
          description: 'Token não informado ou inválido.',
        },

        403: {
          description: 'Usuário sem permissão.',
        },

        500: {
          description: 'Erro interno do servidor.',
        },
      },
    },
  },
};