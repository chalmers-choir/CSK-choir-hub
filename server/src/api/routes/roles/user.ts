import { assignUserToRole, removeUserFromRole } from '@api/controllers/rolesController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.put('/', requireAuth({ groups: ['Admins'] }), assignUserToRole);
router.delete('/', requireAuth({ groups: ['Admins'] }), removeUserFromRole);

export default router;
