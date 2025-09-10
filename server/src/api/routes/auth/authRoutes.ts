import { Router } from "express";

import { loginHandler, registerHandler } from "@api/controllers/authController";

const router = Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);

export default router;
