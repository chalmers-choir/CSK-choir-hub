import { Router } from "express";

import { health } from "@api/controllers";

const router = Router();

router.get("/", health);

export default router;
