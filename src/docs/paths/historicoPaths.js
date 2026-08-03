export default {
  '/chamados/{id}/historico': {
    get: {
      tags: ['Histórico'],

      summary: 'Lista o histórico de um chamado',

      description:
        'Retorna todos os eventos registrados para um chamado em ordem cronológica.',

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: 'id',

          in: 'path',

          required: true,

          description: 'ID do chamado.',

          schema: {
            type: 'integer',
            example: 1,
          },
        },
      ],

      responses: {
        200: {
          description: 'Histórico retornado com sucesso.',
        },

        401: {
          description: 'Token não informado ou inválido.',
        },

        404: {
          description: 'Chamado não encontrado.',
        },

        500: {
          description: 'Erro interno do servidor.',
        },
      },
    },
  },
};