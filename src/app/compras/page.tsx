"use server";

import { getOrders } from "@/components/common/helpers/get-orders";
import { ImageNull } from "@/components/common/helpers/image_null";
import { getUserSession } from "@/components/common/structure-or-layout/session";
import { Separator } from "@/components/ui/separator";

import OrderCard from "./components/order-card";

const ComprasPage = async () => {
  const session = await getUserSession();

  const orders = await getOrders(session.user.id);

  return (
    <>
      <div className="flex items-center justify-center gap-4 py-8">
        <h1 className="text-4xl font-bold">Pedidos</h1>
      </div>
      {orders.map((order) => (
        <div key={order.id}>
          <div className="items-center gap-4 px-3 pt-5">
            <OrderCard
              id={order.id}
              date={order.createdAt}
              status={order.status}
              shippingStatus={order.shippingStatus}
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
