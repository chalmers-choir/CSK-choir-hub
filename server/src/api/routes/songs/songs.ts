import tagsRoutes from './tags';
import { deleteSong, getSongs } from '@api/controllers/songsController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.use('/tags', tagsRoutes);

router.get('/', getSongs);
router.delete('/:id', requireAuth({ roles: ['admin'] }), deleteSong);

export default router;
