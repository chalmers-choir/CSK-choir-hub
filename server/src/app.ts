import express from "express";
import cors from "cors";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import healthRoute from "./routes/healthRoute";

const app = express();

app.use(helmet()); // sets security headers

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // max 100 requests per IP
});

app.use(limiter);

// Middlewares
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*", // allow from your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/health", healthRoute);

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong" });
});

export default app;