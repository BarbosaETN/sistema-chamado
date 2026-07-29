import express from "express";
import routes from './routes/index.js';
import errorHandler from "./middlewares/errorHandler.js";

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger.js';

const app = express();
routes(app)
app.use(errorHandler);
app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec),
);

export default app;