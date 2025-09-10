import { Router } from "express";

import { getBooksHandler, deleteBookHandler } from "@api/controllers";
import { requireAuth } from "@middleware/authMiddleware";

const router = Router();

router.get("/", getBooksHandler);
router.delete("/:id", requireAuth(["admin"]), deleteBookHandler);

export default router;