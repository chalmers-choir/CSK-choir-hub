import { healthHandler } from '@api/controllers';
import { Router } from 'express';

const router = Router();

router.get('/', healthHandler);

export default router;
