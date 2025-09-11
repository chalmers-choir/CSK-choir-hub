import { deleteSongHandler, getSongsHandler } from '@api/controllers';
import { tagsRoutes } from '@api/routes/songs';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/', getSongsHandler);
router.delete('/:id', requireAuth(['admin']), deleteSongHandler);

router.use('/tags', tagsRoutes);

export default router;
