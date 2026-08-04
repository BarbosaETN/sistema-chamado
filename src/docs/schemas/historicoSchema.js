import { HISTORICO_ACAO_VALUES } from "../../constants/historicoAcao";

export default {
  HistoricoResponse: {
    type: "object",

    properties: {
      id: {
        type: "integer",
        example: 1,
      },

      chamadoId: {
        type: "integer",
        example: 1,
      },

      acao: {
        type: "string",

        enum: HISTORICO_ACAO_VALUES,

        example: HISTORICO_ACAO_VALUES[0],
      },

      descricao: {
        type: "string",
        example: "Chamado assumido pelo técnico Carlos.",
      },

      usuario: {
        $ref: "#/components/schemas/UsuarioResponse",
      },

      createdAt: {
        type: "string",
        format: "date-time",
        example: "2026-08-04T15:30:00Z",
      },

      updatedAt: {
        type: "string",
        format: "date-time",
        example: "2026-08-04T15:30:00Z",
      },
    },
  },
};
