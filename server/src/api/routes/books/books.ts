import { createBook, deleteBook, getBookWithId, getBooks } from "@api/controllers/booksController";
import { requireAuth } from "@middleware/authMiddleware";
import { Router } from "express";

import songsRouter from "./songs";

const router = Router();

router.get("/", getBooks);
router.post("/", requireAuth({ groups: ["Admins"] }), createBook);

router.get("/:bookId", getBookWithId);
router.delete("/:bookId", requireAuth({ groups: ["Admins"] }), deleteBook);

router.use("/:bookId/songs", songsRouter);

export default router;
