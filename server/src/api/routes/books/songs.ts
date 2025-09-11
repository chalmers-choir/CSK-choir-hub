import { addSongToBook, removeSongFromBook } from '@api/controllers/booksController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.post('/', requireAuth(['admin']), addSongToBook);
router.delete('/:id', requireAuth(['admin']), removeSongFromBook);

export default router;
