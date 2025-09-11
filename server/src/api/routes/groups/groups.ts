import groupsRouter from './group';
import rolesRouter from './role';
import usersRouter from './user';
import {
  createGroup,
  deleteGroup,
  getGroups,
  updateGroup,
} from '@api/controllers/groupsController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/', getGroups);
router.post('/', requireAuth({ roles: ['admin'] }), createGroup);
router.put('/:groupId', requireAuth({ roles: ['admin'] }), updateGroup);
router.delete('/:groupId', requireAuth({ roles: ['admin'] }), deleteGroup);

router.use('/:groupId/groups', requireAuth({ roles: ['admin'] }), groupsRouter);
router.use('/:groupId/roles', requireAuth({ roles: ['admin'] }), rolesRouter);
router.use('/:groupId/users', requireAuth({ roles: ['admin'] }), usersRouter);

export default router;
