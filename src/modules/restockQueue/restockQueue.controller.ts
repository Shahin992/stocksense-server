import { Request, Response } from 'express';
import { RestockQueueService } from './restockQueue.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const getQueue = catchAsync(async (req: Request, res: Response) => {
  const result = await RestockQueueService.getQueue();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Restock queue fetched',
    data: result,
  });
});

export const RestockQueueController = {
  getQueue,
};
