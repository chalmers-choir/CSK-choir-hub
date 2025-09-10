import { Router } from "express";

import { healthHandler } from "@api/controllers";

const router = Router();

router.get("/", healthHandler);

export default router;
