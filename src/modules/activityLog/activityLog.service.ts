import { ActivityLog } from './activityLog.model';

const logActivity = async (action: string) => {
  await ActivityLog.create({ action });
};

const getRecentLogs = async (limit = 10) => {
  return await ActivityLog.find().sort({ createdAt: -1 }).limit(limit);
};

export const ActivityLogService = {
  logActivity,
  getRecentLogs,
};
