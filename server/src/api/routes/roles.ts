import { deleteRoleHandler, getRolesHandler } from '@api/controllers/rolesController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/', getRolesHandler);
router.delete('/:id', requireAuth(['admin']), deleteRoleHandler);

export default router;
