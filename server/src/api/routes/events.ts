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
router.post('/', requireAuth(['admin']), createEvent);
router.delete('/:id', requireAuth(['admin']), deleteEvent);
router.put('/:id', requireAuth(['admin']), updateEvent);

export default router;
