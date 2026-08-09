export default {
  CategoriaRequest: {
    type: 'object',

    properties: {
      nome: {
        type: 'string',
        example: 'Hardware',
      },

      descricao: {
        type: 'string',
        example: 'Equipamentos e componentes físicos.'
      }
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

      descricao: {
        type: 'string',
        nullable: true,
        example: 'Equipamentos e componentes físicos.'
      }
    },
  },
};