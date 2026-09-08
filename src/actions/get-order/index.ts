"use server";

import { headers } from "next/headers";

import { getOrders } from "@/components/common/helpers/get-orders";
import { auth } from "@/lib/auth";

interface GetOrderId {
  orderId: string;
}

export const getOrder = async ({ orderId }: GetOrderId) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const orders = await getOrders(session.user.id);

  if (orders.length === 0) {
    throw new Error("Order not found");
  }

  const exportOrder = orders.find((order) => order.id === orderId);

  return exportOrder;
};
