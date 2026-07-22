import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { STORAGE_URL } from "@/db/cloudflare";
import { useDecreaseCartProductOrRemove } from "@/hooks/mutations/use-decrease-cart-product-or-remove";
import { useIncreaseCartProductOrAdd } from "@/hooks/mutations/use-increase-cart-product-or-add";

import { Button } from "../ui/button";
import { ImageNull } from "./helpers/image_null";
import { formatCentsToUnits } from "./helpers/money";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  productVariantImageUrl: string | null;
  productVariantPriceInCents: number;
  productVariantQuantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantName,
  productVariantId,
  productVariantImageUrl,
  productVariantPriceInCents,
  productVariantQuantity,
}: CartItemProps) => {
  const increaseCartProductOrAddMutation =
    useIncreaseCartProductOrAdd(productVariantId);

  const decreaseCartProductOrRemoveMutation =
    useDecreaseCartProductOrRemove(id);

  const handleDecreaseClick = () => {
    decreaseCartProductOrRemoveMutation.mutate();
  };
  const handleIncreaseClick = () => {
    increaseCartProductOrAddMutation.mutate();
  };

  const handleDeleteClick = () => {
    decreaseCartProductOrRemoveMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success(
          <div>
            <span className="text-sm font-semibold text-sky-700">
              Produto removido do carrinho
            </span>
          </div>,
        );
      },
      onError: () => {
        toast.error(
          <div>
            <span className="text-sm font-semibold text-red-700">
              Erro ao remover o produto do carrinho
            </span>
          </div>,
        );
      },
    });
  };

  const imageUrl =
    productVariantImageUrl === null ? ImageNull : productVariantImageUrl;
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={STORAGE_URL + imageUrl}
            alt={productVariantName}
            width={78}
            height={78}
            className="rounded-lg"
          />

          <div className="flex flex-col gap-1">
            <p className="text-md font-semibold">{productName.slice(0, 35)}</p>
            <p className="text-muted-foreground text-xs font-medium">
              {productVariantName}
            </p>
            <div className="flex w-25 items-center justify-between rounded-lg p-1">
              {productVariantQuantity === 1 ? (
                <Button size="icon" variant="ghost" onClick={handleDeleteClick}>
                  <Trash2Icon className="text-red-400" />
                </Button>
              ) : (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleDecreaseClick}
                >
                  <MinusIcon />
                </Button>
              )}

              <p>{productVariantQuantity}</p>
              <Button size="icon" variant="ghost" onClick={handleIncreaseClick}>
                <PlusIcon />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center gap-1">
          <p className="text-sm font-semibold">
            {formatCentsToUnits(productVariantPriceInCents)}
          </p>
        </div>
      </div>
    </>
  );
};

export default CartItem;
