import { updateUserAttendance } from '@api/controllers/eventsController';
import { Router } from 'express';

// mergeParams ensures :id from parent route (/events/:id/attendance) is available here
const router = Router({ mergeParams: true });

router.put('/', updateUserAttendance);

export default router;
