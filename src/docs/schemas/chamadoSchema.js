import { PRIORIDADE_VALUES } from "../../constants/prioridade.js";
import { STATUS_VALUES } from "../../constants/status.js";

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

        enum: PRIORIDADE_VALUES,

        example: PRIORIDADE_VALUES[2],
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

        enum: STATUS_VALUES,

        example: STATUS_VALUES[0],
      },

      prioridade: {
        type: "string",

        enum: PRIORIDADE_VALUES,

        example: PRIORIDADE_VALUES[2],
      },

      categoria: {
        $ref: "#/components/schemas/CategoriaResponse"
      },

      usuario: {
        $ref: "#/components/schemas/UsuarioResponse",
      },

      tecnico: {
        allOf: [
          {
            $ref: "#/components/schemas/UsuarioResponse",
          },
        ],

        nullable: true,
      },
    },
  },
};
