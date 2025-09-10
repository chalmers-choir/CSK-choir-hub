import { Router } from "express";

import { deleteUserHandler, getUsersHandler, getUser } from "@api/controllers";
import { requireAuth } from "@middleware/authMiddleware";

const router = Router();

router.get("/", requireAuth(["admin"]), getUsersHandler);
router.get("/:id", requireAuth(["admin"]), getUser);
router.delete("/:id", requireAuth(["admin"]), deleteUserHandler);

export default router;
