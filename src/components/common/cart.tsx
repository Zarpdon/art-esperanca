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
        <div>
          {cartIsPending && (
            <div className="px-5">
              <p>Carrinho está carregando...</p>
              <Loader2 className="animate-spin" />
            </div>
          )}
          {cart?.items.map((item) => (
            <div key={item.id} className="grid grid-cols-1 space-y-2 px-3">
              <Image
                src={STORAGE_URL + item.productVariant.imageUrl}
                alt={item.productVariant.name}
                width={100}
                height={100}
                className="rounded-md"
              />
              <p className="pb-3">{item.productVariant.name}</p>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
