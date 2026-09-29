import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelector from "@/components/common/caregory-selector";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
    limit: 10,
  });
  const newlyProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
    limit: 10,
  });

  const categories = await db.query.categoryTable.findMany();
  return (
    <div>
      <div className="space-y-6">
        <div className="px-0">
          <Image
            src="/banner-joalheria-pedras.webp"
            alt="Gemas preciosas"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <ProductList
          products={products}
          title="TOP 10 Mais Vendidos"
          imageListClassName="rounded-t-lg"
        />

        <div className="p-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5">
          <Image
            src="/banner-joalheria-pedras.webp"
            alt="Gemas preciosas"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
        <div className="rounded-t-xl">
          <ProductList
            products={newlyProducts}
            title="Novidades"
            imageListClassName="rounded-t-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
