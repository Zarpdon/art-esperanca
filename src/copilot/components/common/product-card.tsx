import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { STORAGE_URL } from "@/db/cloudflare";
import { productTable, productVariantTable } from "@/db/schema";
import { cn } from "@/lib/utils";

import OrderPriceValues from "../../../components/common/helpers/price-values-ordenator";

interface ProductCardProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  className?: string;
  imageClassName?: string;
}

export default function ProductCard({
  product,
  className,
  imageClassName,
}: ProductCardProps) {
  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <Link href={`/produto/${product.slug}`}>
        <Image
          src={STORAGE_URL + product.coverImageUrl}
          alt={product.name}
          sizes="100vw"
          width={0}
          height={0}
          className={cn("h-44 w-full object-cover", imageClassName)}
        />
      </Link>

      <CardContent>
        <Link href={`/produto/${product.slug}`} className="no-underline">
          <CardTitle>{product.name}</CardTitle>
          <CardDescription className="truncate text-sm">
            {product.description ?? ""}...
          </CardDescription>
        </Link>
      </CardContent>

      <CardFooter className="justify-between">
        <p className="font-semibold">
          <OrderPriceValues product={product} />
        </p>
        <Link href={`/produto/${product.slug}`}>
          <Button size="sm" variant="outline">
            Ver
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
