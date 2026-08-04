export default {
  CategoriaRequest: {
    type: 'object',

    properties: {
      nome: {
        type: 'string',
        example: 'Hardware',
      },
    },

    required: ['nome'],
  },

  CategoriaResponse: {
    type: 'object',

    properties: {
      id: {
        type: 'integer',
        example: 1,
      },

      nome: {
        type: 'string',
        example: 'Hardware',
      },
    },
  },
};