import { Schema, model } from 'mongoose';
import { IProduct } from './product.interface';

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    minStockThreshold: { type: Number, required: true, default: 5 },
    status: { type: String, enum: ['Active', 'Out of Stock'], default: 'Active' },
  },
  { timestamps: true }
);

export const Product = model<IProduct>('Product', ProductSchema);
