export default {
  ChamadoRequest: {
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

    required: ["titulo", "descricao", "setor", "prioridade", "categoriaId"],
  },

  ChamadoResponse: {
    type: "object",

    properties: {
      id: {
        type: "integer",
        example: 1,
      },

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

      status: {
        type: "string",

        enum: ["Aberto", "Em andamento", "Resolvido", "Fechado"],

        example: "Aberto",
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

      usuarioId: {
        type: "integer",
        example: 3,
      },

      tecnicoId: {
        type: "integer",
        nullable: true,
        example: null,
      },
    },
  },
};
