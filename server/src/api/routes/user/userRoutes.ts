import { Router } from "express";

import { deleteUser, users } from "@api/controllers";
import { requireAuth } from "@middleware/authMiddleware";

const router = Router();

router.get("/users", requireAuth(["admin"]), users);
router.delete("/users/:id", requireAuth(["admin"]), deleteUser);

export default router;
