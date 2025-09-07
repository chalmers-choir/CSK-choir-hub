import { Router } from "express";

import authRoutes from "./auth/authRoutes";
import userRoutes from "./user/userRoutes";
import healthRoute from "./health/healthRoute";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/health", healthRoute);

export default router;