import { assignUserToRole, removeUserFromRole } from '@api/controllers/usersController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.post('/', requireAuth({ roles: ['admin'] }), assignUserToRole);
router.delete('/', requireAuth({ roles: ['admin'] }), removeUserFromRole);

export default router;
