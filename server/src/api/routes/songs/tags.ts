import { assignTagToSong, removeTagFromSong } from '@api/controllers/songsController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.post('/', requireAuth({ roles: ['admin'] }), assignTagToSong);
router.delete('/', requireAuth({ roles: ['admin'] }), removeTagFromSong);

export default router;
