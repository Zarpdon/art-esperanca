import { ArrowLeft } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import CartSummary from "@/components/common/identification-or-checkout/cart-summary";
import CheckoutAddress from "@/components/common/identification-or-checkout/checkout-address";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

import FinishOrderButton from "./components/finish-order-button";

const CheckoutPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }
  return (
    <>
      <div className="p-5">
        <div className="flex place-items-center justify-between px-5">
          <Button variant="ghost" size="icon">
            <Link href="/identificacao">
              <ArrowLeft className="text-blue-600" />
            </Link>
          </Button>
          <h1>Checkout</h1>
          <h1 className="pr-10"></h1>
        </div>
        <div className="px-5 pt-5">
          <CheckoutAddress />
        </div>
        <div className="px-5 pt-5">
          <CartSummary />
        </div>
      </div>
      <div className="py-7"></div>
      <div className="fixed bottom-0 w-full bg-white px-5 py-2">
        <FinishOrderButton />
      </div>
    </>
  );
};

export default CheckoutPage;
