import { authenticate, login, logout, register } from '@api/controllers/authController';
import { Router } from 'express';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/authenticate', authenticate);

export default router;
