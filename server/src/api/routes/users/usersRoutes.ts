import { deleteUserHandler, getUser, getUsersHandler } from '@api/controllers';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/', requireAuth(['admin']), getUsersHandler);
router.get('/:id', requireAuth(['admin']), getUser);
router.delete('/:id', requireAuth(['admin']), deleteUserHandler);

export default router;
