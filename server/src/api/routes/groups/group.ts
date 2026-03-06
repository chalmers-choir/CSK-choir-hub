import { addGroupToGroup, removeGroupFromGroup } from '@api/controllers/groupsController';
import { requireAuth } from '@middleware';
import express from 'express';

const router = express.Router();

router.post('/', requireAuth({ groups: ['Admins'] }), addGroupToGroup);
router.delete('/:groupId', requireAuth({ groups: ['Admins'] }), removeGroupFromGroup);

export default router;
