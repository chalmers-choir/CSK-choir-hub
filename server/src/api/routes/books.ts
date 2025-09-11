import { createBook, deleteBook, getBookWithId, getBooks } from '@api/controllers/booksController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/', getBooks);
router.post('/', requireAuth(['admin']), createBook);

router.delete('/:id', requireAuth(['admin']), deleteBook);
router.get('/:id', getBookWithId);

export default router;
