"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { formatCentsToUnits } from "@/components/common/helpers/money";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { STORAGE_URL } from "@/db/cloudflare";
import { useCart } from "@/hooks/queries/use-cart";

const CartSummary = () => {
  const {
    data: cart,
    isPending: cartIsPending,
    isError: cartIsError,
  } = useCart();

  const router = useRouter();

  useEffect(() => {
    if (!cartIsPending && (!cart || cart.items.length === 0)) {
      router.push("/identificacao");
    }
  }, [cart, cartIsPending, router]);

  return (
    <div>
      <Card className="p-5">
        <CardHeader>
          <CardTitle className="pb-5 text-lg font-bold">Seu pedido</CardTitle>
        </CardHeader>

        {cartIsError && (
          <div className="flex h-full items-center justify-center px-5">
            <p>Verifique seu login e tente novamente</p>
          </div>
        )}

        {cartIsPending && (
          <div className="flex h-full items-center justify-center px-5">
            <p>Carregando...</p>
            <Loader2 className="animate-spin" />
          </div>
        )}

        {!cartIsError && !cartIsPending && (
          <CardContent className="space-y-5">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <p>Subtotal</p>
                <p>Taxa de Entrega</p>
                <p>Total</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="text-muted-foreground">
                  {formatCentsToUnits(cart?.totalPriceInCents ?? 0)}
                  {/*SUBTOTAL*/}
                </p>
                <p className="text-muted-foreground">Grátis</p>
                <p className="font-bold">
                  {formatCentsToUnits(cart?.totalPriceInCents ?? 0)}
                  {/*TOTAL*/}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 py-5">
              {cart?.items.map((item) => (
                <div
                  className="flex items-center gap-10 md:justify-start"
                  key={item.id}
                >
                  <div className="min-h-19.5 min-w-19.5">
                    <Image
                      src={
                        STORAGE_URL +
                        (item.productVariant.imageUrl ??
                          item.productVariant.product.coverImageUrl)
                      }
                      alt={item.productVariant.name}
                      width={78}
                      height={78}
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <p>{item.productVariant.product.name}</p>
                    <p>{item.productVariant.name}</p>
                    <p>Quantidade: {item.quantity}</p>
                    <p>
                      {formatCentsToUnits(item.productVariant.priceInCents)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default CartSummary;
