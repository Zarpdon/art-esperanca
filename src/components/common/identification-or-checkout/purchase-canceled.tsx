import { ArrowRight, CircleX, House, ShoppingCart } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const PurchaseCanceled = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <div className="relative h-20 w-20">
        <ShoppingCart className="absolute top-3 left-1 h-14 w-14 text-slate-600" />

        <CircleX className="absolute top-2 right-2 h-7 w-7 fill-red-500 text-white" />
      </div>
      <div className="flex flex-col items-center pb-5">
        <h1 className="pb-3 font-serif text-3xl font-semibold">
          Pagamento cancelado
        </h1>
        <p className="text-muted-foreground">
          O pagamento do seu pedido não foi realizado.
        </p>
        <p className="text-muted-foreground">
          Pode tentar novamente em Meus Pedidos.
        </p>
      </div>

      <div className="w-full px-10">
        <div className="mx-auto flex w-full max-w-sm flex-col gap-5">
          <Button
            asChild
            className="w-full justify-between rounded-full bg-gray-900 py-5 text-lg"
          >
            <Link href="/compras">
              <p className="pr-5"></p>
              Ver em Meus Pedidos
              <ArrowRight />
            </Link>
          </Button>

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

export default PurchaseCanceled;
