import { deleteGroupHandler, getGroupsHandler } from '@api/controllers/groupsController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/', getGroupsHandler);
router.delete('/:id', requireAuth(['admin']), deleteGroupHandler);

export default router;
