import { addRoleToGroup, removeRoleFromGroup } from '@api/controllers/groupsController';
import { requireAuth } from '@middleware';
import { Router } from 'express';

const router = Router();

router.post('/', requireAuth({ roles: ['admin'] }), addRoleToGroup);
router.delete('/:roleId', requireAuth({ roles: ['admin'] }), removeRoleFromGroup);

export default router;
