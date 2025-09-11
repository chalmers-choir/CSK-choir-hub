import { updateUserAttendance } from '@api/controllers/eventsController';
import { Router } from 'express';

const router = Router();

router.put('/', updateUserAttendance);

export default router;
