import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { Header } from "@/components/common/header";
import ProductDetails from "@/components/common/product-details";
import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
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
  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6">
        <ProductDetails
          variantTitle="Variações Disponíveis:"
          product={product}
        />

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
