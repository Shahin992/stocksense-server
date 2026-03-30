import { Schema, model } from 'mongoose';
import { IOrder, IOrderItem } from './order.interface';

const OrderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>(
  {
    customerName: { type: String, required: true },
    items: { type: [OrderItemSchema], required: true },
    totalPrice: { type: Number, required: true, default: 0 },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder>('Order', OrderSchema);
