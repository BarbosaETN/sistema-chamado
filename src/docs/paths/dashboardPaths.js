export default {
  '/dashboard': {
    get: {
      tags: ['Dashboard'],

      summary: 'Obtém o resumo do dashboard',

      description:
        'Retorna indicadores e estatísticas gerais do sistema de chamados.',

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: 'Resumo do dashboard retornado com sucesso.',

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/DashboarResponse"
              }
            }
          }
        },

        401: {
          description: 'Token não informado ou inválido.',
        },

        500: {
          description: 'Erro interno do servidor.',
        },
      },
    },
  },
};