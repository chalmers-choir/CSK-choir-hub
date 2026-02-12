import { addUserToGroup, removeUserFromGroup } from "@api/controllers/groupsController";
import { requireAuth } from "@middleware";
import { Router } from "express";

const router = Router();

router.post("/", requireAuth({ groups: ["Admins"] }), addUserToGroup);
router.delete("/:userId", requireAuth({ groups: ["Admins"] }), removeUserFromGroup);

export default router;
