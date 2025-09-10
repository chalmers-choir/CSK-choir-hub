import { Router } from "express";

import authRoutes from "./auth/authRoutes";
import userRoutes from "./users/usersRoutes";
import healthRoute from "./health/healthRoute";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/health", healthRoute);
router.use("/books", userRoutes);

export default router;