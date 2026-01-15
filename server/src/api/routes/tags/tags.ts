import { createTag, deleteTag, getTags } from '@api/controllers/tagsController';
import { requireAuth } from '@middleware/authMiddleware';
import { Router } from 'express';

const router = Router();

router.get('/', getTags);
router.post('/', requireAuth({ groups: ['Admins'] }), createTag);
router.delete('/:id', requireAuth({ groups: ['Admins'] }), deleteTag);

export default router;
