import roleUserRoutes from './user';
import { deleteRoleHandler, getRolesHandler } from '@api/controllers/rolesController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/', getRolesHandler);
router.delete('/:roleId', requireAuth({ roles: ['admin'] }), deleteRoleHandler);

router.use('/:roleId/users', requireAuth({ roles: ['admin'] }), roleUserRoutes);

export default router;
