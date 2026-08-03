import authSchemas from "./schemas/authSchemas.js";
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
    ...authSchemas,
    ...usuarioSchema,
  },
};