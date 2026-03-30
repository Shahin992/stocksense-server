import { Product } from '../product/product.model';

const getQueue = async () => {
  const lowStockProducts = await Product.find({
    $expr: { $lt: ["$stockQuantity", "$minStockThreshold"] }
  }).sort({ stockQuantity: 1 });

  return lowStockProducts.map(p => {
    let priority = 'Low';
    if (p.stockQuantity <= 2) priority = 'High';
    else if (p.stockQuantity <= (p.minStockThreshold / 2)) priority = 'Medium';

    return {
      _id: p._id,
      name: p.name,
      stockQuantity: p.stockQuantity,
      minStockThreshold: p.minStockThreshold,
      priority
    };
  });
};

export const RestockQueueService = {
  getQueue,
};
