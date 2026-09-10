import { ChevronRight, House, ShoppingBag } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useOrder } from "@/hooks/queries/use-order";

interface PurchaseAcomplishedProps {
  orderId: string;
}

const PurchaseAcomplished = ({ orderId }: PurchaseAcomplishedProps) => {
  const { data: order } = useOrder(orderId);

  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <div className="flex flex-col items-center pb-5">
        <div className="py-10">
          <ShoppingBag className="h-20 w-20 text-blue-600" />
        </div>
        <h1 className="pb-3 font-serif text-3xl font-semibold">
          Compra concluída!
        </h1>
        <p className="text-muted-foreground">
          Agredecemos por comprar conosco.
        </p>
        <p className="text-muted-foreground">
          Seu pedido foi realizado com sucesso.
        </p>
      </div>

      <div className="w-full px-10">
        <div className="mx-auto flex w-full max-w-sm flex-col gap-5">
          {order && (
            <Button
              asChild
              className="w-full justify-between rounded-full py-5 text-lg"
            >
              <Link href={`/pedido/${order.id}`}>
                <p className="pr-5"></p>
                Ver Pedido
                <ChevronRight />
              </Link>
            </Button>
          )}

          <Button
            asChild
            variant="ghost"
            className="gap-3 rounded-full text-lg"
          >
            <Link href="/">
              <House className="size-5" />
              Voltar ao início
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseAcomplished;
