export default {
  "/chamados/{id}/comentarios": {
    post: {
      tags: ["Comentários"],

      summary: "Adiciona um comentário ao chamado",

      description: "Adiciona um novo comentário a um chamado existente.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "id",

          in: "path",

          required: true,

          description: "ID do chamado.",

          schema: {
            type: "integer",
            example: 1,
          },
        },
      ],

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              type: "object",

              properties: {
                texto: {
                  type: "string",
                  example: "Solicitação encaminhada para o setor responsável.",
                },
              },

              required: ["texto"],
            },
          },
        },
      },

      responses: {
        201: {
          description: "Comentário criado com sucesso.",
        },

        400: {
          description: "Dados inválidos.",
        },

        401: {
          description: "Token não informado ou inválido.",
        },

        403: {
          description: "Usuário sem permissão para comentar.",
        },

        404: {
          description: "Chamado não encontrado.",
        },

        409: {
          description: "Não é possível comentar um chamado fechado.",
        },

        500: {
          description: "Erro interno do servidor.",
        },
      },
    },

    get: {
      tags: ["Comentários"],

      summary: "Lista os comentários de um chamado",

      description:
        "Retorna todos os comentários associados a um chamado especifico",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "id",

          in: "path",

          required: true,

          description: "ID do chamado",

          schema: {
            type: "integer",
            example: 1,
          },
        },
      ],

      responses: {
        200: {
          description: "Comentários retornados com sucesso.",
        },

        401: {
          description: "Token não informado ou inválido.",
        },

        404: {
          description: "Chamado não encontrado.",
        },

        500: {
            description: "Erro interno do servidor.",
        },
      },
    },
  },
};
