import userGroupRoutes from './group';
import userRoleRoutes from './role';
import { deleteUser, getUserWithId, getUsers } from '@api/controllers/usersController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUserWithId);
router.delete('/:userId', requireAuth(['admin']), deleteUser);

router.use('/:userId/group', userGroupRoutes);
router.use('/:userId/role', userRoleRoutes);

export default router;
