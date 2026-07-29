export default {
  "/auth/login": {
    post: {
      tags: ["Auth"],

      summary: "Realiza login",

      description:
        "Autentica um usuário utilizando e-amil e senha e retorna um token JWT.",

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
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
          },
        },
      },

      responses: {
        200: {
          description: "Login realizado com sucesso.",
        },

        401: {
          description: "E-mail ou senha inválidos.",
        },

        500: {
          description: "Erro interno do servidor",
        },
      },
    },
  },
};
