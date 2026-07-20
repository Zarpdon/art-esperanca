"use client";

import Image from "next/image";
import { useState } from "react";

import { formatCentsToUnits } from "@/components/common/helpers/money";
import VariantSelector from "@/components/common/variant-selector";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { STORAGE_URL } from "@/db/cloudflare";
import {
  productImageTable,
  productTable,
  productVariantTable,
} from "@/db/schema";

import AddToCartButton from "./add-to-cart-button";
import QuantitySelector from "./quantity-selector";

interface ProductDetailsProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
    images: (typeof productImageTable.$inferSelect)[];
  };
  variantTitle: string;
}

const ProductDetails = ({ product, variantTitle }: ProductDetailsProps) => {
  const [selectedVariant, setSelectedVariant] = useState<
    (typeof product.variants)[number] | null
  >(null);

  const priceValues = product.variants.map((variant) => variant.priceInCents);
  const priceValuesOrdered = [...priceValues].sort((a, b) => a - b);

  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <Carousel className="w-full justify-center">
        <CarouselContent>
          <CarouselItem className="relative aspect-square">
            <Image
              src={
                STORAGE_URL +
                (selectedVariant?.imageUrl ?? product.coverImageUrl)
              }
              alt={product.name}
              sizes="100vw"
              width={0}
              height={0}
              fill
              className="object-contain"
            />
          </CarouselItem>

          {selectedVariant ? (
            <></>
          ) : (
            <>
              {product.images.map((image) => (
                <CarouselItem key={image.id} className="relative aspect-square">
                  <Image
                    src={STORAGE_URL + image.imageUrl}
                    alt={product.name}
                    sizes="100vw"
                    width={0}
                    height={0}
                    fill
                    className="object-contain"
                  />
                </CarouselItem>
              ))}
              {product.variants
                .filter((variant) => variant.imageUrl)
                .slice(0, 1)
                .map((variant) => (
                  <CarouselItem
                    key={variant.id}
                    className="relative aspect-square"
                  >
                    <Image
                      src={STORAGE_URL + variant.imageUrl}
                      alt={product.name}
                      sizes="100vw"
                      width={0}
                      height={0}
                      fill
                      className="object-contain"
                    />
                  </CarouselItem>
                ))}
            </>
          )}
        </CarouselContent>

        <CarouselPrevious className="left-2 h-8 w-8 md:h-12 md:w-12 lg:h-16 lg:w-16" />
        <CarouselNext className="right-2 h-8 w-8 md:h-12 md:w-12 lg:h-16 lg:w-16" />
      </Carousel>
      <div className="px-3">
        {product.variants.length > 1 ? (
          <>
            <h3 className="text-md px-2 pb-3 font-semibold">{variantTitle}</h3>

            <VariantSelector
              product={product}
              selectedVariant={selectedVariant}
              onVariantSelect={setSelectedVariant}
            />
            <h3 className="py-3 text-lg font-semibold">
              {selectedVariant ? (
                formatCentsToUnits(selectedVariant.priceInCents)
              ) : (
                <>
                  {formatCentsToUnits(priceValuesOrdered[0])} -{" "}
                  {formatCentsToUnits(
                    priceValuesOrdered[priceValuesOrdered.length - 1],
                  )}
                </>
              )}
            </h3>
          </>
        ) : (
          <>
            <h3 className="py-3 text-lg font-semibold">
              {formatCentsToUnits(priceValues[0])}
            </h3>
          </>
        )}
      </div>

      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
      <div className="flex flex-col space-y-4 px-5">
        {/* BOTÕES */}

        {product.variants.length > 1 ? (
          <AddToCartButton
            productVariantId={selectedVariant?.id ?? "null"}
            quantity={quantity}
          />
        ) : (
          <AddToCartButton
            productVariantId={product.variants[0].id}
            quantity={quantity}
          />
        )}

        <Button className="rounded-full" size="lg">
          Comprar agora
        </Button>
      </div>
    </>
  );
};
export default ProductDetails;
