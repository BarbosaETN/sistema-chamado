export default {
  UsuarioRequest: {
    type: "object",

    properties: {
      nome: {
        type: "string",
        example: "João Silva",
      },

      email: {
        type: "string",
        example: "joao@email.com",
      },

      senha: {
        type: "string",
        example: "123456",
      },

      cargo: {
        type: "string",

        enum: ["USUARIO", "TECNICO", "ADMIN"],

        example: "USUARIO",
      },
    },

    required: ["nome", "email", "senha", "cargo"],
  },

  UsuarioResponse: {
    type: "object",

    properties: {
      id: {
        type: "integer",
        example: 1,
      },

      nome: {
        type: "string",
        example: "João Silva",
      },

      email: {
        type: "string",
        example: "joao@email.com",
      },

      cargo: {
        type: "string",

        enum: ["USUARIO", "TECNICO", "ADMIN"],

        example: "USUARIO",
      },

      statusCadastro: {
        type: "string",

        enum: ["Pendente", "Aprovado", "Rejeitado"],

        example: "Aprovado",
      },
    },
  },
};
