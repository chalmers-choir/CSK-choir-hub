import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import routes from "./api/routes/routes";
import setupSwagger from "./core/config/swagger";
import { errorHandler } from "./core";

const app = express();

/* ---- Security Middlewares ---- */
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // max 1000 requests per IP
});
app.use(limiter);

/* ---- Utility Middlewares ---- */
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*", // allow from your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/* ---- Routes ---- */
setupSwagger(app); // Swagger setup
app.use("/api", routes); // Main API routes

/* ---- Error Handling Middlewares ---- */
app.use(errorHandler);

export default app;
