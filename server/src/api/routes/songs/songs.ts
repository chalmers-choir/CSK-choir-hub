import tagsRoutes from './tags';
import { createSong, deleteSong, getSongs } from '@api/controllers/songsController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/', getSongs);
router.post('/', requireAuth({ roles: ['admin'] }), createSong);
router.delete('/:songId', requireAuth({ roles: ['admin'] }), deleteSong);

router.use('/songId/tags', tagsRoutes);

export default router;
