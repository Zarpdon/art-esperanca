import Image from "next/image";
import Link from "next/link";

import { STORAGE_URL } from "@/db/cloudflare";
import { productTable, productVariantTable } from "@/db/schema";

interface VariantSelectorProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
}

const VariantSelector = ({ product }: VariantSelectorProps) => {
  return (
    <div className="flex items-center gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      {product.variants.map((variant) => (
        <div key={variant.id}>
          <Link href={`/produto/${variant.slug}`}>
            <Image
              width={68}
              height={68}
              src={
                STORAGE_URL + variant.imageUrl ||
                STORAGE_URL + product.coverImageUrl
              }
              alt={variant.name}
              className="rounded-xl"
            />
          </Link>
          <p>{variant.name}</p>
        </div>
      ))}
    </div>
  );
};

export default VariantSelector;
