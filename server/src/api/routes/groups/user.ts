import { addUserToGroup, removeUserFromGroup } from '@api/controllers/groupsController';
import { requireAuth } from '@middleware';
import { Router } from 'express';

const router = Router();

router.post('/', requireAuth({ roles: ['admin'] }), addUserToGroup);
router.delete('/:userId', requireAuth({ roles: ['admin'] }), removeUserFromGroup);

export default router;
