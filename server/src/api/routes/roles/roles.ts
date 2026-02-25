import { createRole, deleteRole, getRoles } from "@api/controllers/rolesController";
import { requireAuth } from "@middleware/authMiddleware";
import { Router } from "express";

import roleUserRoutes from "./user";

const router = Router();

router.get("/", getRoles);
router.post("/", createRole);
router.delete("/:roleId", requireAuth({ groups: ["Admins"] }), deleteRole);

router.use("/:roleId/user", requireAuth({ groups: ["Admins"] }), roleUserRoutes);

export default router;
