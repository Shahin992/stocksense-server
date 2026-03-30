import { Document, Types } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  category: Types.ObjectId;
  price: number;
  stockQuantity: number;
  minStockThreshold: number;
  status: 'Active' | 'Out of Stock';
  createdAt: Date;
  updatedAt: Date;
}
