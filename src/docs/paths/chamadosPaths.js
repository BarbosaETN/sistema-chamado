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
                  enum: ["Baixa", "Média", "Alta", "Critica"],
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
          description: "Chamado criado com sucesso.",
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

    put: {
      tags: ["Chamados"],

      summary: "Atualiza um chamado",

      description: "Atualiza as informações de um chamado existente.",

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
                  enum: ["Baixa", "Média", "Alta", "Crítica"],
                  example: "Alta",
                },

                categoriaId: {
                  type: "integer",
                  example: 1,
                },
              },
            },
          },
        },
      },

      responses: {
        200: {
          description: "Chamado atualizado com sucesso.",
        },

        400: {
          description: "Dados inválidos.",
        },

        401: {
          description: "Token não informado ou inválido.",
        },

        404: {
          description: "Chamado ou categoria não encontrados.",
        },

        500: {
          description: "Erro interno do servidor.",
        },
      },
    },

    delete: {
      tags: ["Chamados"],

      summary: "Remove um chamado",

      dsecription: "Remove um chamado do sistema pelo ID.",

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
          description: "Chamado removido com sucesso.",
        },

        401: {
          description: "Token não informado ou inválido.",
        },

        403: {
          description: "Usuário sem permissão.",
        },

        404: {
          description: "Chamado não encontrado.",
        },

        500: {
          description: "Erro interno do servidor",
        },
      },
    },
  },

  "/chamados/{id}/assumir": {
    patch: {
      tags: ["Chamados"],

      summary: "Assume um chamado",

      description:
        'Permite que um técnico ou administrador assuma um chamado. O técnico autenticado é definido como responsável e o status do chamado é alterado automaticamente para "Em andamento".',

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
          description: "Chamado assumido com sucesso.",
        },

        401: {
          description: "Token não informado ou inválido.",
        },

        403: {
          description:
            "Apenas técnicos e administradores podem assumir chamados.",
        },

        404: {
          description: "Chamado não encontrado.",
        },

        409: {
          description: "O chamado já foi assumido.",
        },

        500: {
          description: "Erro interno do servidor.",
        },
      },
    },
  },

  "/chamados/{id}/resolver": {
    patch: {
      tags: ["Chamados"],

      summary: "Resolve um chamado",

      description:
        'Permite que um técnico ou administrador resolva um chamado. O técnico autenticado é definido como responsável e o status do chamado é alterado automaticamente para "Resolvido".',

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
          description: "Chamado resolvido com sucesso.",
        },

        401: {
          description: "Token não informado ou inválido.",
        },

        403: {
          description:
            "Apenas técnicos e administradores podem resolver chamados.",
        },

        404: {
          description: "Chamado não encontrado.",
        },

        409: {
          description: "O chamado já foi resolvido.",
        },

        500: {
          description: "Erro interno do servidor.",
        },
      },
    },
  },

    "/chamados/{id}/fechar": {
    patch: {
      tags: ["Chamados"],

      summary: "Fecha um chamado",

      description:
        'Permite que um técnico ou administrador feche um chamado. O técnico autenticado é definido como responsável e o status do chamado é alterado automaticamente para "Fechado".',

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
          description: "Chamado fechado com sucesso.",
        },

        401: {
          description: "Token não informado ou inválido.",
        },

        403: {
          description:
            "Apenas técnicos e administradores podem fechar chamados.",
        },

        404: {
          description: "Chamado não encontrado.",
        },

        409: {
          description: "O chamado já foi fechado.",
        },

        500: {
          description: "Erro interno do servidor.",
        },
      },
    },
  },
};
