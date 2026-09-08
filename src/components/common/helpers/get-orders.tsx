import { db } from "@/db";

export const getOrders = async (userId: string) => {
  return await db.query.orderTable.findMany({
    where: (orders, { eq }) => eq(orders.userId, userId),
    orderBy: (order, { desc }) => desc(order.createdAt),
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });
};
