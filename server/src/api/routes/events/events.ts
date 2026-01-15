import attendanceRoutes from './attendance';
import registrationRoutes from './registration';
import {
  createEvent,
  deleteEvent,
  getEventDetail,
  getEvents,
  updateEvent,
} from '@api/controllers/eventsController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/', getEvents);
router.post('/', requireAuth({ groups: ['Admins'] }), createEvent);

router.get('/:id', getEventDetail);
router.put('/:id', requireAuth({ groups: ['Admins'] }), updateEvent);
router.delete('/:id', requireAuth({ groups: ['Admins'] }), deleteEvent);

router.use('/:id/attendance', requireAuth(), attendanceRoutes);
router.use('/:id/registration', requireAuth(), registrationRoutes);

export default router;
