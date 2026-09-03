"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { auth } from "@/lib/auth";

interface GetOrder {
  page?: boolean;
  specificId?: string;
}

export const getOrder = async ({ page, specificId }: GetOrder = {}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const orders = await db.query.orderTable.findMany({
    where: (orders, { eq }) => eq(orders.userId, session.user.id),
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
  if (orders.length === 0) {
    throw new Error("Order not found");
  }

  if (page === true) {
    return orders.map((order) => ({
      ...order,
    }));
  }
  if (specificId) {
    return orders.find((order) => order.id === specificId);
  }

  const exportOrder = orders[0];

  return exportOrder;
};
