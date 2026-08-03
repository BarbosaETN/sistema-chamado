export default {
  "/usuarios": {
    get: {
      tags: ["Usuários"],

      summary: "Lista todos os usuários",

      description: "Retorna uma lista com todos os usuários cadastrados.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        200: {
          description: "Lista de usuários retornada com sucesso.",

          content: {
            "application/json": {
              schema: {
                type: "array",

                items: {
                  $ref: "#/components/schemas/UsuarioResponse"
                }
              }
            }
          }
        },

        401: {
          description: "Token não informado ou inválido.",
        },

        403: {
          description: "Usuário sem permissão.",
        },

        500: {
          description: "Erro interno do servidor.",
        },
      },
    },

    post: {
      tags: ["Usuários"],

      summary: "Cadastra um novo usuário.",

      description: "Cria um novo usuário no sistema.",

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UsuarioRequest",
            },
          },
        },

        responses: {
          200: {
            description: "Usuário criado com sucesso.",

            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UsuarioResponse",
                },
              },
            },
          },

          400: {
            description: "Dados inválidos.",
          },

          409: {
            description: "E-mail já cadastrado.",
          },

          500: {
            description: "Erro interno do servidor.",
          },
        },
      },
    },
  },

  "/usuarios/{id}/aprovar": {
    patch: {
      tags: ["Usuários"],

      summary: "Aprova um usuário",

      description: "Aprova o cadastro de um usuário no sistema.",

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

          description: "ID do usuário.",

          schema: {
            type: "integer",
            example: 1,
          },
        },
      ],

      responses: {
        200: {
          description: "Usuário aprovado com sucesso.",
        },

        401: {
          description: "Token não informado ou inválido.",
        },

        403: {
          description: "Apenas administradores podem aprovar usuários.",
        },

        404: {
          description: "Usuário não encontrado.",
        },

        500: {
          description: "Erro interno do servidor.",
        },
      },
    },
  },

  "/usuarios/{id}": {
    get: {
      tag: ["Usuários"],

      summary: "Busca um usuário por id.",

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

          description: "ID do usuário.",

          schema: {
            type: "integer",
            example: 1,
          },
        },
      ],

      responses: {
        200: {
          description: "Usuário encontrado com sucesso.",

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UsuarioResponse"
              }
            }
          }
        },
        404: {
          description: "Usuário não encontrado.",
        },
        401: {
          description: "Token não informado ou inválido.",
        },
        500: {
          description: "Erro interno do servidor.",
        },
      },
    },

    put: {
      tags: ["Usuários"],

      summary: "Atualiza um usuário",

      description: "Atualiza os dados de um usuário existente.",

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
          description: "ID do usuário",
          schema: {
            type: "integer",
            examle: 1,
          },
        },
      ],

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UsuarioRequest"
            },
          },
        },
      },

      responses: {
        200: {
          description: "Usuário atualizado com sucesso.",

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UsuarioResponse"
              }
            }
          }
        },

        400: {
          description: "Dados inválidos.",
        },

        401: {
          description: "Token não informado ou inválido.",
        },

        404: {
          description: "Usuário não encotrado.",
        },

        500: {
          description: "Erro interno do servidor.",
        },
      },
    },

    delete: {
      tags: ["Usuários"],

      summary: "Remove um usuário",

      description: "Remove um usuário do sistema pelo ID.",

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

          description: "ID do usuário.",

          schema: {
            type: "integer",
            example: 1,
          },
        },
      ],

      responses: {
        200: {
          description: "Usuário removido com sucesso.",
        },

        401: {
          description: "Token não informado ou inválido.",
        },

        403: {
          description: "Usuário sem permissão.",
        },

        404: {
          description: "Usuário não encontrado.",
        },

        500: {
          description: "Erro interno do servidor.",
        },
      },
    },
  },
};