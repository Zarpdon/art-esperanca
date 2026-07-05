import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  console.log(products);
  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="space-y-6">
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

        <ProductList products={products} title="Mais Vendidos" />

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
