import { createTag, deleteTag, getTags } from '@api/controllers/tagsController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/', getTags);
router.post('/', requireAuth(['admin']), createTag);
router.delete('/:id', requireAuth(['admin']), deleteTag);

export default router;
