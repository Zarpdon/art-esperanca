"use client";

import Image from "next/image";
import { useState } from "react";

import { formatCentsToUnits } from "@/components/common/money";
import VariantSelector from "@/components/common/variant-selector";
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
  const priceValuesOrdered = priceValues.sort((a, b) => a - b);

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
            </>
          )}
        </CarouselContent>

        <CarouselPrevious className="left-2 h-8 w-8 md:h-12 md:w-12 lg:h-16 lg:w-16" />
        <CarouselNext className="right-2 h-8 w-8 md:h-12 md:w-12 lg:h-16 lg:w-16" />
      </Carousel>

      <div className="px-3">
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
      </div>
      <div className="px-5">Quantidade</div>
    </>
  );
};
export default ProductDetails;
