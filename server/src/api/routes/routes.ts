import { Router } from "express";
import authRoutes from "./auth";
import bookRoutes from "./books";
import eventRoutes from "./events";
import groupRoutes from "./groups";
import healthRoute from "./health";
import roleRoutes from "./roles";
import songRoutes from "./songs";
import tagRoutes from "./tags";
import userRoutes from "./users";

const router = Router();

router.use("/auth", authRoutes);
router.use("/books", bookRoutes);
router.use("/events", eventRoutes);
router.use("/groups", groupRoutes);
router.use("/roles", roleRoutes);
router.use("/songs", songRoutes);
router.use("/tags", tagRoutes);
router.use("/users", userRoutes);
router.use("/health", healthRoute);

export default router;
