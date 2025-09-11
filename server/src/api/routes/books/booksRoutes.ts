import { deleteBookHandler, getBooksHandler } from '@api/controllers';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/', getBooksHandler);
router.delete('/:id', requireAuth(['admin']), deleteBookHandler);

export default router;
