import routes from "@api/routes";
import { errorHandler, logAtLevel } from "@middleware";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

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
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000").split(",");

app.use(
  cors({
    // Dynamically validate Origin so ACAO matches the requesting site when allowed.
    origin: (origin, callback) => {
      // allow non-browser/SSR requests (no origin) and any whitelisted origin
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin ?? true);
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
  }),
);

/* ---- Routes ---- */
app.use("/api", routes); // Main API routes

/* ---- Error Handling Middlewares ---- */
app.use(errorHandler);

export default app;
