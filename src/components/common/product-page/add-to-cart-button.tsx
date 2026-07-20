"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast(
        <div>
          <span className="text-sm font-semibold text-sky-700">
            Produto adicionado ao carrinho
          </span>
        </div>,
      );
    },
  });

  return (
    <Button
      className="rounded-full"
      size="lg"
      variant="outline"
      disabled={isPending}
      onClick={() =>
        productVariantId === "null"
          ? toast(
              <div className="p-3 px-15">
                <span className="text-sm font-semibold text-red-700">
                  Selecione uma variação
                </span>
              </div>,
            )
          : mutate()
      }
    >
      Adicionar ao carrinho
      {isPending && <Loader2 className="mr-1 animate-spin" />}
    </Button>
  );
};

export default AddToCartButton;
