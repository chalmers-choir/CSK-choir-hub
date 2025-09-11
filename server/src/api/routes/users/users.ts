import userGroupRoutes from '../groups/groups';
import userRoleRoutes from '../roles/user';
import { deleteUser, getUserWithId, getUsers } from '@api/controllers/usersController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUserWithId);
router.delete('/:userId', requireAuth({ roles: ['admin'] }), deleteUser);

router.use('/:userId/group', userGroupRoutes);
router.use('/:userId/role', userRoleRoutes);

export default router;
