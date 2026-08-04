export default {
  ComentarioRequest: {
    type: "object",

    properties: {
      texto: {
        type: "string",
        example: "Solicitação encaminhada para o setor responsável.",
      },
    },

    required: ["texto"],
  },

  ComentarioResponse: {
    type: "object",

    properties: {
      id: {
        type: "integer",
        example: 1,
      },

      texto: {
        type: "string",
        example: "Solicitação encaminhada para o setor responsável.",
      },

      autor: {
        $ref: "#/components/schemas/UsuarioResponse",
      },

      createdAt: {
        type: "string",
        format: "date-time",
        example: "2026-08-04T14:30:00Z",
      },
    },
  },
};
