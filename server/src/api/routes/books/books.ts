import songsRouter from './songs';
import { createBook, deleteBook, getBookWithId, getBooks } from '@api/controllers/booksController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/', getBooks);
router.post('/', requireAuth({ roles: ['admin'] }), createBook);

router.delete('/:bookId', requireAuth({ roles: ['admin'] }), deleteBook);
router.get('/:bookId', getBookWithId);

router.use('/:bookId/songs', songsRouter);

export default router;
