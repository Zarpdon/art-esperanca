import { getOrders } from "@/components/common/helpers/get-orders";
import { ImageNull } from "@/components/common/helpers/image_null";
import { formatCentsToUnits } from "@/components/common/helpers/money";
import { getUserSession } from "@/components/common/structure-or-layout/session";
import { Separator } from "@/components/ui/separator";

import OrderItem from "../components/order-item";

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

const OrderPage = async ({ params }: OrderPageProps) => {
  const { id } = await params;

  const session = await getUserSession();

  const orders = await getOrders(session.user.id);

  const order = orders.find((order) => order.id === id);
  if (!order) {
    throw new Error("Order not found");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <h1 className="text-4xl font-bold">Pedido: {id}</h1>

      <div className="w-full px-5">
        <p>Composição:</p>
        <Separator className="mt-3" />
      </div>

      {order.items.map((item) => (
        <div className="w-full px-5" key={item.id}>
          <OrderItem
            name={item.productName}
            variant={item.productVariantName}
            quantity={item.quantity}
            image={item.productVariant?.imageUrl ?? ImageNull}
            subtotal={item.priceInCents}
          />
          <Separator className="mt-5" />
        </div>
      ))}
      <div>
        <p>
          {order.priceShippingInCents === 0
            ? "Frete: grátis!"
            : `Frete: ${formatCentsToUnits(order.priceShippingInCents)}`}
        </p>
        <p>Total: {formatCentsToUnits(order.priceTotalInCents)}</p>
      </div>
    </div>
  );
};

export default OrderPage;
