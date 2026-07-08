import { desc } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

import CategorySelector from "@/components/common/caregory-selector";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
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
      <div>
        <Header />
      </div>

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

      <div className="space-y-3 px-5">
        <h1 className="pt-2">Página inicial</h1>
        <p>
          This is a simple Next.js app. <br />
          Esta é uma aplicação simples feita com Next.js.
        </p>
        <div className="space-y-3 p-2 pb-10">
          <div className="grid place-items-center">
            <Button>
              <Link href="/authentication">Autenticação</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
