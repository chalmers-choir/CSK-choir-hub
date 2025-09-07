import { Router } from "express";

// TODO: get away from relative paths
import { login, register } from "../../controllers/authController";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
