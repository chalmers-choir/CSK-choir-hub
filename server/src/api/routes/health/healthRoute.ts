import { Router } from "express";

// TODO: get away from relative paths
import { health } from "@api/controllers";

const router = Router();

router.get("/", health);

export default router;
