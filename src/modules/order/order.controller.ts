import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.createOrder(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getOrders();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { status } = req.body;
  const result = await OrderService.updateOrderStatus(id, status);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order status updated successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getOrders,
  updateOrderStatus,
};
