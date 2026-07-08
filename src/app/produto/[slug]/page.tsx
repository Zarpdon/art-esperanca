import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Header } from "@/components/common/header";
import { formatCentsToUnits } from "@/components/common/money";
import ProductList from "@/components/common/product-list";
import VariantSelector from "@/components/common/variant-selector";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { db } from "@/db";
import { STORAGE_URL } from "@/db/cloudflare";
import { productTable } from "@/db/schema";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;
  const product = await db.query.productTable.findFirst({
    where: eq(productTable.slug, slug),
    with: {
      variants: true,
      images: true,
    },
  });
  if (!product) {
    return notFound();
  }
  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, product.categoryId),
    with: {
      variants: true,
    },
    limit: 5,
  });
  const priceValues = product.variants.map((variant) => variant.priceInCents);
  const priceValuesOrdered = priceValues.sort((a, b) => a - b);
  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6">
        <Carousel className="w-full justify-center">
          <CarouselContent>
            <CarouselItem className="relative aspect-square">
              <Image
                src={STORAGE_URL + product.coverImageUrl}
                alt={product.name}
                sizes="100vw"
                width={0}
                height={0}
                fill
                className="object-contain"
              />
            </CarouselItem>

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
          </CarouselContent>
          <CarouselPrevious className="left-2 h-8 w-8 md:h-12 md:w-12 lg:h-16 lg:w-16" />
          <CarouselNext className="right-2 h-8 w-8 md:h-12 md:w-12 lg:h-16 lg:w-16" />
        </Carousel>

        <div className="px-5">
          {/* DESCRIÇÃO */}

          <VariantSelector product={product} />
          <h3 className="text-muted-foreground text-sm">Descrição</h3>
          <h3 className="text-lg font-semibold">
            {formatCentsToUnits(priceValuesOrdered[0])} -{" "}
            {formatCentsToUnits(
              priceValuesOrdered[priceValuesOrdered.length - 1],
            )}
          </h3>
        </div>
        <div className="px-5">Quantidade</div>
        <div className="flex flex-col space-y-4 px-5">
          {/* BOTÕES */}
          <Button className="rounded-full" size="lg" variant="outline">
            Adicionar ao carrinho
          </Button>
          <Button className="rounded-full" size="lg">
            Comprar agora
          </Button>
        </div>
        <div className="px-5">
          <p className="text-muted-foreground text-sm">{product.description}</p>
        </div>
        <ProductList
          title="Talvez você goste"
          products={likelyProducts}
          imageListClassName="rounded-t-lg"
        />
      </div>
    </>
  );
};

export default ProductPage;
