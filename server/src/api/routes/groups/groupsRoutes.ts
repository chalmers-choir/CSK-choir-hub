import { Router } from "express";

import { getGroupsHandler, deleteGroupHandler } from "@api/controllers";
import { requireAuth } from "@middleware/authMiddleware";

const router = Router();

router.get("/", getGroupsHandler);
router.delete("/:id", requireAuth(["admin"]), deleteGroupHandler);

export default router;