import { createSong, deleteSong, getSongs } from "@api/controllers/songsController";
import { requireAuth } from "@middleware/authMiddleware";
import { Router } from "express";
import tagsRoutes from "./tags";

const router = Router();

router.get("/", getSongs);
router.post("/", requireAuth({ groups: ["Admins"] }), createSong);
router.delete("/:songId", requireAuth({ groups: ["Admins"] }), deleteSong);

router.use("/songId/tags", tagsRoutes);

export default router;
