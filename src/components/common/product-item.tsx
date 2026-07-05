import Image from "next/image";
import Link from "next/link";

import { formatCentsToUnits } from "@/components/common/money";
import { STORAGE_URL } from "@/db/cloudflare";
import { productTable, productVariantTable } from "@/db/schema";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
}

const ProductItem = ({ product }: ProductItemProps) => {
  const firstVariant = product.variants[0];
  return (
    <Link href="/" className="flex flex-col gap-4">
      <Image
        src={STORAGE_URL + product.coverImageUrl}
        alt={product.name}
        width={200}
        height={200}
        className="rounded-3xl"
      />
      <div className="flex max-w-50 flex-col gap-1">
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-muted-foreground truncate text-xs font-medium">
          {product.description}...
        </p>
        <p className="truncate text-sm font-semibold">
          {formatCentsToUnits(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
