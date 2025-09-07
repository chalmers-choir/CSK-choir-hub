import dotenv from "dotenv";
import app from "./app";
import { PrismaClient } from "@prisma/client";

// Load environment variables
dotenv.config();

// Server port
const PORT = process.env.PORT || 5000;

// Initialize Prisma Client
const prisma = new PrismaClient();

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to PostgreSQL via Prisma");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

// Start the server
startServer();