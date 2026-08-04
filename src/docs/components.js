import authSchema from "./schemas/authSchema.js";
import categoriaSchema from "./schemas/categoriaSchema.js";
import chamadoSchema from "./schemas/chamadoSchema.js";
import comentarioSchema from "./schemas/comentarioSchema.js";
import dashboardSchema from "./schemas/dashboardSchema.js";
import historicoSchema from "./schemas/historicoSchema.js";
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
    ...categoriaSchema,
    ...chamadoSchema,
    ...comentarioSchema,
    ...historicoSchema,
    ...dashboardSchema,
  },
};