"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { auth } from "@/lib/auth";

import OrderCard from "./components/order-card";

const ComprasPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
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

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <h1 className="text-4xl font-bold">Compras</h1>
      </div>
      {orders.map((order) => (
        <div key={order.id} className="flex flex-col items-center gap-4 py-10">
          <OrderCard
            id={order.id}
            date={order.createdAt}
            status={order.shippingStatus}
            name={order.shippingName}
            quantity={order.items[0].quantity}
            image={order.shippingDocument}
            subtotal={order.items[0].priceInCents}
            total={order.priceTotalInCents}
          />
        </div>
      ))}
    </>
  );
};

export default ComprasPage;
