"use client";

import { useState } from "react";

import PurchaseAcomplished from "@/components/common/identification-or-checkout/purchase-acomplished";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCreateOrder } from "@/hooks/mutations/use-create-order";

const FinishOrderButton = () => {
  const createOrderMutation = useCreateOrder();
  const [open, setOpen] = useState(false);

  const [orderId, setOrderId] = useState<string>("");

  const handleCreateOrder = () => {
    createOrderMutation.mutate(undefined, {
      onSuccess: (orderId) => {
        setOrderId(orderId);
        setOpen(true);
      },
    });
  };

  return (
    <>
      <div>
        <Button
          onClick={handleCreateOrder}
          className="w-full rounded-full py-5"
        >
          Finalizar compra
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false}>
          <DialogTitle></DialogTitle>
          <PurchaseAcomplished orderId={orderId} />
        </DialogContent>
      </Dialog>
      ;
    </>
  );
};

export default FinishOrderButton;
