import { assignUserToGroup, removeUserFromGroup } from '@api/controllers/usersController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.post('/:groupId', requireAuth(['admin']), assignUserToGroup);
router.delete('/:groupId', requireAuth(['admin']), removeUserFromGroup);

export default router;
