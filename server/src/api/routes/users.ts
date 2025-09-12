import { deleteUser, getUserWithId, getUsers } from '@api/controllers/usersController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUserWithId);
router.delete('/:userId', requireAuth({ roles: ['admin'] }), deleteUser);

export default router;
