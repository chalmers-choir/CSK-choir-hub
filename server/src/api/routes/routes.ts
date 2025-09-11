import authRoutes from './auth';
import eventRoutes from './events';
import healthRoute from './health';
import userRoutes from './users/users';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRoutes);
router.use('/books', userRoutes);
router.use('/events', eventRoutes);
router.use('/groups', userRoutes);
router.use('/roles', userRoutes);
router.use('/songs', userRoutes);
router.use('/tags', userRoutes);
router.use('/users', userRoutes);
router.use('/health', healthRoute);

export default router;
