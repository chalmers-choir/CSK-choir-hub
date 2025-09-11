import authRoutes from './auth/authRoutes';
import healthRoute from './health/healthRoute';
import userRoutes from './users/usersRoutes';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/health', healthRoute);
router.use('/books', userRoutes);

export default router;
