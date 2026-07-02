import Link from "next/link";

import { Header } from "@/components/common/header";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <h1>Página inicial</h1>
      <p>
        This is a simple Next.js app. <br />
        Esta é uma aplicação simples feita com Next.js.
      </p>
      <Button>
        <Link href="/authentication">Autenticação</Link>
      </Button>
    </div>
  );
};

export default Home;
