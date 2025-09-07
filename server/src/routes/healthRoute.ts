import { Router } from "express";
import { health } from "../controllers/authController";

const router = Router();

router.get("/", health);

export default router;