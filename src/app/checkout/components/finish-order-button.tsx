"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import PurchaseAcomplished from "@/components/common/identification-or-checkout/purchase-acomplished";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCreateCheckoutSession } from "@/hooks/mutations/use-create-checkout-session";
import { useCreateOrder } from "@/hooks/mutations/use-create-order";

const FinishOrderButton = () => {
  const createOrderMutation = useCreateOrder();
  const createCheckoutSessionMutation = useCreateCheckoutSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [orderId, setOrderId] = useState<string>("");

  const handleCreateOrder = async () => {
    const orderId = await createOrderMutation.mutateAsync();
    const checkoutSession = await createCheckoutSessionMutation.mutateAsync({
      orderId,
    });
    if (!checkoutSession?.url) {
      throw new Error("Checkout URL not found");
    }
    window.location.href = checkoutSession.url;
    setOrderId(orderId);
    setOpen(true);
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
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            router.push("/identificacao");
          }
        }}
      >
        <DialogContent onInteractOutside={(event) => event.preventDefault()}>
          <DialogTitle></DialogTitle>
          <PurchaseAcomplished orderId={orderId} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FinishOrderButton;
