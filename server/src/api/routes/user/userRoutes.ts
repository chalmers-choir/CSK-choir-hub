import { Router } from "express";

// TODO: get away from relative paths
import { deleteUser, users } from "@api/controllers/userController";
import { requireAuth } from "@core/middleware/authMiddleware";

const router = Router();

router.get("/users", requireAuth(["admin"]), users);
router.delete("/users/:id", requireAuth(["admin"]), deleteUser);

export default router;
