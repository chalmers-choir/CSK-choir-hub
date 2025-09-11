import { assignTagToSong, removeTagFromSong } from '@api/controllers/songsController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.post('/:id', requireAuth({ roles: ['admin'] }), assignTagToSong);
router.delete('/:id', requireAuth({ roles: ['admin'] }), removeTagFromSong);

export default router;
