export default {
  "/categorias": {
    get: {
      tags: ["Categorias"],

      summary: "Retorna uma lista de categorias",

      description: "Retorna uma lista com todas as categorias cadastradas.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: "Lista de categorias retornada com sucesso.",
        },

        401: {
          description: "Token não informado ou inválido.",
        },

        500: {
          description: "Erro interno do servidor.",
        },
      },
    },

    post: {
      tags: ["Categorias"],

      summary: "Cria uma nova categoria",

      description: "Cria uma nova categoria para classificação dos chamados.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              type: "object",

              properties: {
                nome: {
                  type: "string",
                  example: "Hardware",
                },
              },

              required: ["nome"],
            },
          },
        },
      },

      responses: {
        201: {
          description: "Categoria criada com sucesso.",
        },

        400: {
          description: "Dados inválidos.",
        },

        401: {
          description: "Token não informado ou inválido.",
        },

        403: {
          description: "Apenas administradores podem criar categorias.",
        },

        409: {
          description: "Já existe uma categoria com esse nome.",
        },

        500: {
          description: "Erro interno do servidor.",
        },
      },
    },
  },

  "/categorias/{id}": {
    get: {
      tags: ["Categorias"],

      summary: "Retorna uma categoria pelo ID",

      description: "Retorna os dados de uma categoria especifica.",

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

          description: "ID da categoria",

          schema: {
            type: "integer",
            example: ",",
          },
        },
      ],

      responses: {
        200: {
          description: "Categoria encontrada com sucesso.",
        },

        401: {
          description: "Token não informado ou inválido.",
        },

        404: {
          description: "Categoria não encontrada.",
        },

        500: {
          description: "Erro interno do servidor.",
        },
      },
    },

    put: {
      tags: ["Categorias"],

      summary: "Atualiza uma categoria",

      description: "Atualiza as informações de uma categoria existente.",

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

          description: "ID da categoria",

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
                nome: {
                  type: "string",
                  example: "Hardware",
                },
              },

              required: ["nome"],
            },
          },
        },
      },

      responses: {
        200: {
          description: "Categoria atualizada com sucesso.",
        },

        400: {
          description: "Dados inválidos.",
        },

        401: {
          description: "Token não informado ou inválido.",
        },

        404: {
          description: "Categoria não encontrada.",
        },

        500: {
          description: "Erro interno do servidor.",
        },
      },
    },

    delete: {
      tags: ["Categorias"],

      summary: "Remove uma categoria",

      description: "Remove uma categoria do sistema pelo ID.",

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

          description: "ID da categoria.",

          schema: {
            type: "integer",
            example: 1,
          },
        },
      ],

      responses: {
        200: {
          description: "Categoria removida com sucesso.",
        },

        401: {
          description: "Token não informado ou inválido.",
        },

        403: {
          description: "Apenas administradores podem remover categorias.",
        },

        404: {
          description: "Categoria não encontrada.",
        },

        409: {
          description:
            "Não é possível excluir uma categoria que possui chamados associados.",
        },

        500: {
          description: "Erro interno do servidor.",
        },
      },
    },
  },
};
