import { Router } from 'express';
import { RestockQueueController } from './restockQueue.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/', auth('admin', 'manager'), RestockQueueController.getQueue);

export const RestockQueueRoutes = router;
