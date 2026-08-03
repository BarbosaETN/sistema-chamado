export default {
  LoginRequest: {
    type: "object",

    properties: {
      email: {
        type: "string",
        example: "admin@email.com",
      },

      senha: {
        type: "string",
        example: "123456",
      },
    },

    required: ["email", "senha"],
  },

  LoginResponse: {
    type: "object",

    properties: {
      token: {
        type: "string",
        example: "eyJhbGciOiJIUzI1NiIs...",
      },

      usuario: {
        type: "object",

        properties: {
          id: {
            type: "integer",
            example: 1,
          },

          nome: {
            type: "string",
            example: "Administrador",
          },

          email: {
            type: "string",
            example: "admin@email.com",
          },

          cargo: {
            type: "string",
            example: "ADMIN",
          },
        },
      },
    },
  },
};
