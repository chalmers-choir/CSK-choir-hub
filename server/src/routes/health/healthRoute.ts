import { Router } from "express";

// TODO: get away from relative paths
import { health } from "../../controllers/healthController";

const router = Router();

router.get("/", health);

export default router;