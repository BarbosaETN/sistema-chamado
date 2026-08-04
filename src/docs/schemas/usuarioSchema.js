import CARGO, { CARGO_VALUES } from "../../constants/cargo";
import { STATUS_CADASTRO_VALUES } from "../../constants/statusCadastro";

export default {
  UsuarioRequest: {
    type: "object",

    properties: {
      nome: {
        type: "string",
        example: "João Silva",
      },

      email: {
        type: "string",
        example: "joao@email.com",
      },

      senha: {
        type: "string",
        example: "123456",
      },

      cargo: {
        type: "string",

        enum: CARGO_VALUES,

        example: CARGO.USUARIO,
      },
    },

    required: ["nome", "email", "senha", "cargo"],
  },

  UsuarioResponse: {
    type: "object",

    properties: {
      id: {
        type: "integer",
        example: 1,
      },

      nome: {
        type: "string",
        example: "João Silva",
      },

      email: {
        type: "string",
        example: "joao@email.com",
      },

      cargo: {
        type: "string",

        enum: CARGO_VALUES,

        example: CARGO.USUARIO,
      },

      statusCadastro: {
        type: "string",

        enum: STATUS_CADASTRO_VALUES,

        example: STATUS_CADASTRO_VALUES[0],
      },
    },
  },
};
