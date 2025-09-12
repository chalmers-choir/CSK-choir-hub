import roleUserRoutes from './user';
import { deleteRole, getRoles } from '@api/controllers/rolesController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/', getRoles);
router.delete('/:roleId', requireAuth({ roles: ['admin'] }), deleteRole);

router.use('/:roleId/user', requireAuth({ roles: ['admin'] }), roleUserRoutes);

export default router;
