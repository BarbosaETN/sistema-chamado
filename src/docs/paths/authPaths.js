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
              $ref: "#/components/schemas/LoginRequest",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Login realizado com sucesso.",

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginResponse",
              },
            },
          },
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
