import authSchema from "./schemas/authSchema.js";
import usuarioSchema from "./schemas/usuarioSchema.js";

export default {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },

  schemas: {
    ...authSchema,
    ...usuarioSchema,
  },
};