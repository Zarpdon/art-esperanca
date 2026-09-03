"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useUserAddresses } from "@/copilot/hooks/use-user-addresses";
import { useCart } from "@/hooks/queries/use-cart";

const CheckoutAddress = () => {
  const { data: addresses = [], isLoading } = useUserAddresses();
  const { data: cart } = useCart();
  const address = cart?.shippingAddress ?? addresses[0];
  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <Card>
          <CardContent className="flex items-start justify-between gap-3 py-4">
            <div className="flex items-start gap-3">
              <Label htmlFor={address.id}>
                <div className="space-y-1">
                  <p className="font-semibold">{address.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {address.street}, {address.number} - {address.neighborhood}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {address.city}/{address.state} - CEP {address.zipCode}
                  </p>
                </div>
              </Label>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CheckoutAddress;
