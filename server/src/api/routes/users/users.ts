import { deleteUser, getUserWithId, getUsers, updateUser } from '@api/controllers/usersController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUserWithId);
router.put('/:userId', updateUser);
router.delete('/:userId', requireAuth({ groups: ['Admins'] }), deleteUser);

export default router;
