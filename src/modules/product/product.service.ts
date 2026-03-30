import { IProduct } from './product.interface';
import { Product } from './product.model';
import { ActivityLogService } from '../activityLog/activityLog.service';

const createProduct = async (payload: IProduct): Promise<IProduct> => {
  payload.status = payload.stockQuantity > 0 ? 'Active' : 'Out of Stock';
  const result = await Product.create(payload);
  return result;
};

const getProducts = async (): Promise<IProduct[]> => {
  return await Product.find().populate('category');
};

const updateProductStock = async (id: string, newStock: number) => {
  const product = await Product.findById(id);
  if (!product) throw new Error('Product not found');

  product.stockQuantity = newStock;
  product.status = newStock > 0 ? 'Active' : 'Out of Stock';

  const result = await product.save();
  await ActivityLogService.logActivity(`Stock updated for "${product.name}"`);
  return result;
};

const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  const product = await Product.findById(id);
  if (!product) throw new Error('Product not found');

  if (payload.stockQuantity !== undefined) {
    payload.status = payload.stockQuantity > 0 ? 'Active' : 'Out of Stock';
  }

  const result = await Product.findByIdAndUpdate(id, payload, { new: true });
  await ActivityLogService.logActivity(`Product "${product.name}" updated`);
  return result;
};

const deleteProduct = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) throw new Error('Product not found');

  await Product.findByIdAndDelete(id);
  await ActivityLogService.logActivity(`Product "${product.name}" permanently removed`);
  return true;
};

export const ProductService = {
  createProduct,
  getProducts,
  updateProductStock,
  updateProduct,
  deleteProduct,
};
