import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductService } from './product.service';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.createProduct(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const getProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getProducts();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Products retrieved successfully',
    data: result,
  });
});

const updateProductStock = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { stockQuantity } = req.body;
  const result = await ProductService.updateProductStock(id, stockQuantity);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product stock updated successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductService.updateProduct(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await ProductService.deleteProduct(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product deleted successfully',
    data: null,
  });
});

export const ProductController = {
  createProduct,
  getProducts,
  updateProductStock,
  updateProduct,
  deleteProduct,
};
