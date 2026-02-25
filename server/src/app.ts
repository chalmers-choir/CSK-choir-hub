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

// Helper function to check if origin is a local development URL
const isLocalDevelopment = (origin: string | undefined): boolean => {
  if (!origin) return false;

  // Allow localhost and local network IPs on port 3000 (Next.js dev server)
  const localPatterns = [
    /^http:\/\/localhost:3000$/,
    /^http:\/\/127\.0\.0\.1:3000$/,
    /^http:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:3000$/, // Any IP with port 3000
  ];

  return localPatterns.some((pattern) => pattern.test(origin));
};

app.use(
  cors({
    // Dynamically validate Origin so ACAO matches the requesting site when allowed.
    origin: (origin, callback) => {
      // allow non-browser/SSR requests (no origin), whitelisted origins, or local dev
      if (!origin || allowedOrigins.includes(origin) || isLocalDevelopment(origin)) {
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
