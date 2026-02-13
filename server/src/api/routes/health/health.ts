import { health } from "@api/controllers/healthController";
import { Router } from "express";

const router = Router();

router.get("/", health);

export default router;
