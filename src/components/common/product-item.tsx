import Image from "next/image";
import Link from "next/link";

import { STORAGE_URL } from "@/db/cloudflare";
import { productTable, productVariantTable } from "@/db/schema";
import { cn } from "@/lib/utils";

import OrderPriceValues from "./helpers/price-values-ordenator";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textAndPriceClassName?: string;
  imageClassName?: string;
}

const ProductItem = ({
  product,
  textAndPriceClassName,
  imageClassName,
}: ProductItemProps) => {
  return (
    <Link href={`/produto/${product.slug}`} className="flex flex-col gap-4">
      <Image
        src={STORAGE_URL + product.coverImageUrl}
        alt={product.name}
        sizes="100vw"
        width={0}
        height={0}
        className={cn("h-auto w-full", imageClassName)}
      />
      <div
        className={cn("flex max-w-50 flex-col gap-1", textAndPriceClassName)}
      >
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-muted-foreground truncate text-xs font-medium">
          {product.description}...
        </p>
        <p className="truncate text-sm font-semibold">
          <OrderPriceValues product={product} />
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
