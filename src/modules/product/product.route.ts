import express from 'express';
import { ProductController } from './product.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/', auth('admin', 'manager'), ProductController.createProduct);
router.get('/', ProductController.getProducts);
router.patch('/:id/update-stock', auth('admin', 'manager'), ProductController.updateProductStock);
router.patch('/:id', auth('admin', 'manager'), ProductController.updateProduct);
router.delete('/:id', auth('admin', 'manager'), ProductController.deleteProduct);

export const ProductRoutes = router;
