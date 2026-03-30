import express from 'express';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/', auth('admin', 'manager'), CategoryController.createCategory);
router.get('/', CategoryController.getCategories);

export const CategoryRoutes = router;
