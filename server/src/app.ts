import routes from '@api/routes';
import { errorHandler, logAtLevel } from '@middleware';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const app = express();

/* ---- Security Middlewares ---- */
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // max 1000 requests per IP
});
app.use(limiter);

app.use(cookieParser());

/* ---- Utility Middlewares ---- */
app.use(express.json());

/* ---- Logging Middleware ---- */
app.use(logAtLevel(4));

/* ---- CORS configuration ---- */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*', // allow from your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

/* ---- Routes ---- */
app.use('/api', routes); // Main API routes

/* ---- Error Handling Middlewares ---- */
app.use(errorHandler);

export default app;
