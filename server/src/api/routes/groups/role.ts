import { addRoleToGroup, removeRoleFromGroup } from '@api/controllers/groupsController';
import { requireAuth } from '@middleware';
import { Router } from 'express';

const router = Router();

router.post('/', requireAuth({ groups: ['Admins'] }), addRoleToGroup);
router.delete('/:roleId', requireAuth({ groups: ['Admins'] }), removeRoleFromGroup);

export default router;
