import { Router } from "express";
import { profile, users, deleteUser } from "../controllers/userController";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

router.get("/profile", requireAuth(), profile);
router.get("/users", requireAuth(["admin"]), users);
router.delete("/users/:id", requireAuth(["admin"]), deleteUser);

export default router;