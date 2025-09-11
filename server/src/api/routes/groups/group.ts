import { addGroupToGroup, removeGroupFromGroup } from '@api/controllers/groupsController';
import { requireAuth } from '@middleware';
import express from 'express';

const router = express.Router();

router.post('/', requireAuth({ roles: ['admin'] }), addGroupToGroup);
router.delete('/:groupId', requireAuth({ roles: ['admin'] }), removeGroupFromGroup);

export default router;
