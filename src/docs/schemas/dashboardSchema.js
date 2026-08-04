export default {
  DashboardResponse: {
    type: 'object',

    properties: {
      totalChamados: {
        type: 'integer',
        example: 25,
      },

      status: {
        type: 'object',

        properties: {
          aberto: {
            type: 'integer',
            example: 5,
          },

          emAndamento: {
            type: 'integer',
            example: 8,
          },

          resolvido: {
            type: 'integer',
            example: 10,
          },

          fechado: {
            type: 'integer',
            example: 2,
          },
        },
      },

      prioridades: {
        type: 'object',

        properties: {
          baixa: {
            type: 'integer',
            example: 3,
          },

          media: {
            type: 'integer',
            example: 8,
          },

          alta: {
            type: 'integer',
            example: 10,
          },

          critica: {
            type: 'integer',
            example: 4,
          },
        },
      },

      categorias: {
        type: 'array',

        items: {
          type: 'object',

          properties: {
            categoriaId: {
              type: 'integer',
              example: 1,
            },

            categoriaNome: {
              type: 'string',
              example: 'Hardware',
            },

            total: {
              type: 'integer',
              example: 12,
            },
          },
        },
      },
    },
  },
};