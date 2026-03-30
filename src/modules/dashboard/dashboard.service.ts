import { Order } from '../order/order.model';
import { Product } from '../product/product.model';
import { ActivityLog } from '../activityLog/activityLog.model';

const getDashboardStats = async () => {
  const today = new Date().setHours(0, 0, 0, 0);

  // Parallel execution for performance
  const [orders, products, logs] = await Promise.all([
    Order.find().populate('items.product'),
    Product.find().populate('category'),
    ActivityLog.find().sort({ createdAt: -1 }).limit(10)
  ]);

  const ordersToday = orders.filter((o: any) => new Date(o.createdAt).getTime() >= today);
  const revenueToday = ordersToday.reduce((acc: number, o: any) => acc + (o.totalPrice || 0), 0);
  const pendingOrdersCount = orders.filter((o: any) => o.status === 'Pending').length;
  const completedOrdersCount = orders.filter((o: any) => o.status === 'Delivered').length;
  const lowStockItemsCount = products.filter((p: any) => p.stockQuantity > 0 && p.stockQuantity <= p.minStockThreshold).length;

  return {
    stats: {
      pendingOrdersCount,
      completedOrdersCount,
      revenueToday,
      lowStockItemsCount,
    },
    productSummary: products.slice(0, 10).map(p => ({
      _id: p._id,
      name: p.name,
      stockQuantity: p.stockQuantity,
      minStockThreshold: p.minStockThreshold,
      status: p.status
    })),
    recentActivities: logs,
  };
};

export const DashboardService = {
  getDashboardStats,
};
