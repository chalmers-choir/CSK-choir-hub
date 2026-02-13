import { registerUserForEvent, unregisterUserFromEvent } from "@api/controllers/eventsController";
import { Router } from "express";

const router = Router({ mergeParams: true });

router.post("/", registerUserForEvent);
router.delete("/", unregisterUserFromEvent);

export default router;
