"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCreateCheckoutSession } from "@/hooks/mutations/use-create-checkout-session";
import { useCreateOrder } from "@/hooks/mutations/use-create-order";

const FinishOrderButton = () => {
  const createOrderMutation = useCreateOrder();
  const createCheckoutSessionMutation = useCreateCheckoutSession();

  const handleCreateOrder = async () => {
    const orderId = await createOrderMutation.mutateAsync();
    const checkoutSession = await createCheckoutSessionMutation.mutateAsync({
      orderId,
    });
    if (!checkoutSession?.url) {
      throw new Error("Checkout URL not found");
    }
    window.location.href = checkoutSession.url;
  };

  return (
    <>
      <div>
        <Button
          onClick={handleCreateOrder}
          className="w-full rounded-full py-5"
          disabled={createOrderMutation.isPending}
        >
          {createOrderMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Finalizando
            </>
          ) : (
            "Finalizar compra"
          )}
        </Button>
      </div>
    </>
  );
};

export default FinishOrderButton;
