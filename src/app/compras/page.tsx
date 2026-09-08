"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getOrders } from "@/components/common/helpers/get-orders";
import { ImageNull } from "@/components/common/helpers/image_null";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";

import OrderCard from "./components/order-card";

const ComprasPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }

  const orders = await getOrders(session.user.id);

  return (
    <>
      <div className="flex items-center justify-center gap-4 py-8">
        <h1 className="text-4xl font-bold">Compras</h1>
      </div>
      {orders.map((order) => (
        <div key={order.id}>
          <div className="items-center gap-4 px-3 pt-5">
            <OrderCard
              id={order.id}
              date={order.createdAt}
              status={order.shippingStatus}
              name={order.items[0].productName}
              variant={order.items[0].productVariantName}
              quantity={order.items[0].quantity}
              image={order.items[0].productVariant?.imageUrl ?? ImageNull}
              subtotal={order.items[0].priceInCents}
              total={order.priceTotalInCents}
            />
          </div>
          <Separator className="mx-4 my-4" />
        </div>
      ))}
    </>
  );
};

export default ComprasPage;
