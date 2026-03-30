import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { ProductRoutes } from '../modules/product/product.route';
import { OrderRoutes } from '../modules/order/order.route';
import { ActivityLogRoutes } from '../modules/activityLog/activityLog.route';
import { RestockQueueRoutes } from '../modules/restockQueue/restockQueue.route';
import { DashboardRoutes } from '../modules/dashboard/dashboard.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/dashboard',
    route: DashboardRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/activity-logs',
    route: ActivityLogRoutes,
  },
  {
    path: '/restock-queue',
    route: RestockQueueRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
