import { assignUserToRole, removeUserFromRole } from '@api/controllers/rolesController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.put('/', requireAuth({ roles: ['admin'] }), assignUserToRole);
router.delete('/', requireAuth({ roles: ['admin'] }), removeUserFromRole);

export default router;
