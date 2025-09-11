import { createTagHandler, deleteTagHandler, getTagsHandler } from '@api/controllers';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/', getTagsHandler);
router.post('/', createTagHandler);
router.delete('/:id', requireAuth(['admin']), deleteTagHandler);

export default router;
