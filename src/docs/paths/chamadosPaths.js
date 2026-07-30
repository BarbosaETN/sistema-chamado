export default {
  "/chamados": {
    get: {
      tags: ["Chamados"],

      summary: "Lista todos os chamados",

      description:
        "Retorna uma lista de chamados com suporte a filtros, busca, paginação e ordenação.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "status",

          in: "query",

          description: "Filtra pelo status do chamado.",

          schema: {
            type: "string",
            example: "Aberto",
          },
        },

        {
          name: "prioridade",

          in: "query",

          description: "Filtra pela prioridade.",

          schema: {
            type: "string",
            example: "Alta",
          },
        },

        {
          name: "categoriaId",

          in: "query",

          description: "Filtra pela categoria.",

          schema: {
            type: "integer",
            example: 1,
          },
        },

        {
          name: "tecnicoId",

          in: "query",

          description: "Filtra pelo técnico responsável.",

          schema: {
            type: "integer",
            example: 2,
          },
        },

        {
          name: "usuarioId",

          in: "query",

          description: "Filtra pelo usuário solicitante.",

          schema: {
            type: "integer",
            example: 5,
          },
        },

        {
          name: "busca",

          in: "query",

          description: "Busca por título ou descrição.",

          schema: {
            type: "string",
            example: "Impressora",
          },
        },

        {
          name: "page",

          in: "query",

          description: "Número da página.",

          schema: {
            type: "integer",
            example: 1,
          },
        },

        {
          name: "limit",

          in: "query",

          description: "Quantidade de registros por página.",

          schema: {
            type: "integer",
            example: 10,
          },
        },

        {
          name: "sortBy",

          in: "query",

          description: "Campo utilizado para ordenação.",

          schema: {
            type: "string",
            example: "createdAt",
          },
        },

        {
          name: "order",

          in: "query",

          description: "Direção da ordenação.",

          schema: {
            type: "string",
            example: "DESC",
          },
        },
      ],

      responses: {
        200: {
          description: "Lista de chamados retornada com sucesso.",
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
      tags: ["Chamados"],

      summary: "Cria um novo chamado",

      description: "Criad um novo chamado de suporte técnico.",

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
                titulo: {
                  type: "string",
                  example: "Impressora sem tinta",
                },

                descricao: {
                  type: "string",
                  example: "A impressora não imprime nenhuma página.",
                },

                setor: {
                  type: "string",
                  example: "Financeiro",
                },

                prioridade: {
                  type: "string",
                  enum: [
                    'Baixa',
                    'Média',
                    'Alta',
                    'Critica',
                  ],
                  example: "Alta",
                },

                categoriaId: {
                  type: "integer",
                  example: 1,
                },
              },

              required: [
                "titulo",
                "descricao",
                "setor",
                "prioridade",
                "categoriaId",
              ],
            },
          },
        },
      },

      responses: {
        201: {
            description: "Chamado criado com sucesso."
        },

        400: {
            description: "Dados inválidos."
        },

        401: {
            description: "Token não informado ou inválido."
        },

        404: {
            description: "Categoria não encontrada."
        },

        500: {
            description: "Erro interno do servidor."
        },
      }
    },
  },

  "/chamados/{id}": {
    get: {
      tags: ["Chamados"],

      summary: "Busca um chamado pelo ID.",

      description: "Retorna os dados de um chamado especifico.",

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

      responses: {
        200: {
          description: "Chamado encontrado com sucesso.",
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
