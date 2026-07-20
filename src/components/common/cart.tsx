"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";

import { getCart } from "@/actions/get-cart";
import { STORAGE_URL } from "@/db/cloudflare";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";

export const Cart = () => {
  const { data: cart, isPending: cartIsPending } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => getCart(),
  });

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
        <div className="space-y-4 px-4">
          {cartIsPending && (
            <div className="px-5">
              <p>Carrinho está carregando...</p>
              <Loader2 className="animate-spin" />
            </div>
          )}
          {cart?.items.map((item) => (
            <div key={item.id}>
              <CartItem
                id={item.id}
                productName={item.productVariant.product.name}
                productVariantName={item.productVariant.name}
                productVariantImageUrl={item.productVariant.imageUrl}
                productVariantPriceInCents={item.productVariant.priceInCents}
                productVariantQuantity={item.quantity}
              />
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
