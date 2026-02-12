import {
  createEvent,
  deleteEvent,
  getEventDetail,
  getEvents,
  updateEvent,
} from "@api/controllers/eventsController";
import { requireAuth } from "@middleware/authMiddleware";
import { Router } from "express";
import registrationRoutes from "./registrations";
import attendanceRoutes from "./attendance";

const router = Router();

router.get("/", getEvents);
router.post("/", requireAuth({ groups: ["Admins"] }), createEvent);

router.get("/:id", getEventDetail);
router.put("/:id", requireAuth({ groups: ["Admins"] }), updateEvent);
router.delete("/:id", requireAuth({ groups: ["Admins"] }), deleteEvent);

router.use("/:id/attendances", attendanceRoutes);
router.use("/:id/registrations", registrationRoutes);

export default router;
