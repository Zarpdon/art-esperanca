"use client";

import { Loader2, ShoppingCartIcon } from "lucide-react";

import { useCart } from "@/hooks/queries/use-cart";

import { formatCentsToUnits } from "../common/helpers/money";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";

export const Cart = () => {
  const {
    data: cart,
    isPending: cartIsPending,
    isError: cartIsError,
  } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <ShoppingCartIcon />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col pb-5">
          <div className="flex h-full max-h-full flex-col overflow-hidden">
            <ScrollArea className="h-full">
              <div className="flex h-full flex-col gap-5">
                {cartIsError && (
                  <div className="flex h-full items-center justify-center px-5">
                    <p>Faça login para ver o seu carrinho</p>
                  </div>
                )}
                {cartIsPending && (
                  <div className="flex h-full items-center justify-center px-5">
                    <p>Carrinho está carregando...</p>
                    <Loader2 className="animate-spin" />
                  </div>
                )}
                {!cartIsError &&
                  cart?.items.map((item) => (
                    <div key={item.id} className="space-y-4 px-4">
                      <CartItem
                        id={item.id}
                        productName={item.productVariant.product.name}
                        productVariantId={item.productVariant.id}
                        productVariantName={item.productVariant.name}
                        productVariantImageUrl={item.productVariant.imageUrl}
                        productVariantPriceInCents={
                          item.productVariant.priceInCents
                        }
                        productVariantQuantity={item.quantity}
                      />
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </div>
          {!cartIsError && cart?.items && cart?.items.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <Separator />
              <div className="flex items-center justify-between px-5 text-sm font-medium">
                <p>Subtotal</p>
                <p>{formatCentsToUnits(cart?.totalPriceInCents ?? 0)}</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between px-5 text-sm font-medium">
                <p>Entrega</p>
                <p>GRÁTIS</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between px-5 text-sm font-medium">
                <p>Total</p>
                <p>{formatCentsToUnits(cart?.totalPriceInCents ?? 0)}</p>
              </div>
              <div className="flex px-5">
                <Button className="mt-3 w-full rounded-full">
                  Finalizar compra
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
