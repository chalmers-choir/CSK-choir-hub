import {
  createGroup,
  deleteGroup,
  getGroups,
  updateGroup,
} from "@api/controllers/groupsController";
import { requireAuth } from "@middleware/authMiddleware";
import { Router } from "express";
import groupsRouter from "./group";
import rolesRouter from "./role";
import usersRouter from "./user";

const router = Router();

router.get("/", getGroups);
router.post("/", requireAuth({ groups: ["Admins"] }), createGroup);
router.put("/:groupId", requireAuth({ groups: ["Admins"] }), updateGroup);
router.delete("/:groupId", requireAuth({ groups: ["Admins"] }), deleteGroup);

router.use("/:groupId/groups", requireAuth({ groups: ["Admins"] }), groupsRouter);
router.use("/:groupId/roles", requireAuth({ groups: ["Admins"] }), rolesRouter);
router.use("/:groupId/users", requireAuth({ groups: ["Admins"] }), usersRouter);

export default router;
