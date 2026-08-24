import { headers } from "next/headers";
import { redirect } from "next/navigation";

import CartSummary from "@/components/common/identification-or-checkout/cart-summary";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

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
        <div>Checkout</div>
        <CartSummary />
      </div>
      <div className="fixed bottom-0 w-full bg-white px-5 py-2">
        <Button className="w-full rounded-full py-5">Finalizar compra</Button>
      </div>
    </>
  );
};

export default CheckoutPage;
