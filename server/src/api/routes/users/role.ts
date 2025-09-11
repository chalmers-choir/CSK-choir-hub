import { assignUserToGroup, removeUserFromGroup } from '@api/controllers/usersController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.post('/:roleId', requireAuth(['admin']), assignUserToGroup);
router.delete('/:roleId', requireAuth(['admin']), removeUserFromGroup);

export default router;
