import attendanceRoutes from './attendance';
import registrationRoutes from './registration';
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from '@api/controllers/eventsController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/', getEvents);
router.post('/', requireAuth({ roles: ['admin'] }), createEvent);

router.use('/attendance', requireAuth(), attendanceRoutes);
router.use('/registration', requireAuth(), registrationRoutes);

router.delete('/:id', requireAuth({ roles: ['admin'] }), deleteEvent);
router.put('/:id', requireAuth({ roles: ['admin'] }), updateEvent);

export default router;
