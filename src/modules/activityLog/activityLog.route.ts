import express from 'express';
import { ActivityLogController } from './activityLog.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth('admin', 'manager'), ActivityLogController.getRecentLogs);

export const ActivityLogRoutes = router;
