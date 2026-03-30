import mongoose from 'mongoose';
import { IOrder } from './order.interface';
import { Order } from './order.model';
import { Product } from '../product/product.model';
import { ActivityLogService } from '../activityLog/activityLog.service';

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const productIds = payload.items.map((item) => item.product.toString());
    const uniqueProductIds = new Set(productIds);

    if (uniqueProductIds.size !== productIds.length) {
      throw new Error('This product is already added to the order.');
    }

    let totalPrice = 0;

    for (const item of payload.items) {
      const product = await Product.findById(item.product).session(session);

      if (!product) {
        throw new Error('Product not found');
      }

      if (product.status === 'Out of Stock') {
        throw new Error('This product is currently unavailable.');
      }

      if (item.quantity > product.stockQuantity) {
        throw new Error(`Only ${product.stockQuantity} items available in stock`);
      }

      totalPrice += product.price * item.quantity;

      // Deduct stock
      product.stockQuantity -= item.quantity;
      if (product.stockQuantity === 0) {
        product.status = 'Out of Stock';
      }

      await product.save({ session });

      if (product.stockQuantity < product.minStockThreshold) {
        await ActivityLogService.logActivity(`Product "${product.name}" added to Restock Queue`);
      }
    }

    payload.totalPrice = totalPrice;
    const newOrder = await Order.create([payload], { session });

    await ActivityLogService.logActivity(`Order #${newOrder[0]._id.toString().slice(-4)} created by user`);

    await session.commitTransaction();
    session.endSession();

    return newOrder[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getOrders = async () => {
  return await Order.find().populate('items.product').sort({ createdAt: -1 });
};

const updateOrderStatus = async (id: string, status: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const originalOrder = await Order.findById(id).session(session);
    if (!originalOrder) throw new Error('Order not found');

    const previousStatus = originalOrder.status;

    // If order was not cancelled, but is NOW being cancelled: Restore Stock
    if (status === 'Cancelled' && previousStatus !== 'Cancelled') {
      for (const item of originalOrder.items) {
        await Product.findByIdAndUpdate(
          item.product,
          { 
            $inc: { stockQuantity: item.quantity },
            $set: { status: 'Active' } // Any increment means at least 1 back
          },
          { session }
        );
        const product = await Product.findById(item.product).session(session);
        if (product) {
          await ActivityLogService.logActivity(`Stock restored for "${product.name}" (Order Cancelled)`);
        }
      }
    }

    // If order WAS cancelled, but status is now being changed BACK (optional/complex):
    // For simplicity, we only handle Cancelled -> Restored.
    // If it was cancelled and now changed, we would need to check stock again.
    // But in EAP, status is usually Pending -> Confirmed -> Shipped -> Delivered or Cancelled.

    const result = await Order.findByIdAndUpdate(id, { status }, { new: true, session });
    
    if (result) {
      await ActivityLogService.logActivity(`Order #${result._id.toString().slice(-4)} marked as ${status}`);
    }

    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const OrderService = {
  createOrder,
  getOrders,
  updateOrderStatus,
};
