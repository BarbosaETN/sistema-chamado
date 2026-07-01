import express from "express";
import routes from './routes/index.js';
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
routes(app)
app.use(errorHandler);

export default app;