import { loginHandler, registerHandler } from '@api/controllers/authController';
import { Router } from 'express';

const router = Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);

export default router;
