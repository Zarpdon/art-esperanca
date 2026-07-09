"use client";

import Image from "next/image";

import { STORAGE_URL } from "@/db/cloudflare";
import { productTable, productVariantTable } from "@/db/schema";

import { Button } from "../ui/button";

interface VariantSelectorProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  selectedVariant: typeof productVariantTable.$inferSelect | null;
  onVariantSelect: (
    variant: typeof productVariantTable.$inferSelect | null,
  ) => void;
}

const VariantSelector = ({
  product,
  selectedVariant,
  onVariantSelect,
}: VariantSelectorProps) => {
  return (
    <div className="flex items-center gap-4 overflow-x-auto px-2 py-2 [&::-webkit-scrollbar]:hidden">
      {product.variants.map((variant) => (
        <div key={variant.id} className="flex w-24 flex-col items-center">
          <Button
            onClick={() =>
              onVariantSelect(
                selectedVariant?.id === variant.id ? null : variant,
              )
            }
            variant={selectedVariant?.id === variant.id ? "default" : "outline"}
            className={`h-20 w-20 overflow-hidden rounded p-0 hover:opacity-70 ${
              selectedVariant?.id === variant.id ? "ring-primary ring-4" : ""
            }`}
          >
            <Image
              width={80}
              height={80}
              className="h-full w-full object-cover"
              src={
                STORAGE_URL + variant.imageUrl ||
                STORAGE_URL + product.coverImageUrl
              }
              alt={variant.name}
            />
          </Button>
          <p className="mt-1 text-center text-xs">{variant.name}</p>
        </div>
      ))}
    </div>
  );
};

export default VariantSelector;
