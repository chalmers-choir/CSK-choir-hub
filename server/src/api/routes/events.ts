import { deleteEventHandler, getEventsHandler } from '@api/controllers/eventsController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/', getEventsHandler);
router.delete('/:id', requireAuth(['admin']), deleteEventHandler);

export default router;
