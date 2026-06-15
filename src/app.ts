import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import { routes } from "./routes";

export const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Routes
app.use(routes);

// Error handler (sempre por último)
app.use(errorHandler);