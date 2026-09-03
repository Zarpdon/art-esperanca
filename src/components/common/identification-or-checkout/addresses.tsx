"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AddAddressForm from "@/copilot/components/forms/add-address-form";
import { useSetDefaultAddress } from "@/copilot/hooks/use-set-default-address";
import { useUserAddresses } from "@/copilot/hooks/use-user-addresses";
import { useUpdateCartShippingAddress } from "@/hooks/mutations/use-update-cart-shipping-address";

const Addresses = () => {
  const [selectAddress, setSelectAddress] = useState<string | null>("");
  const { data: addresses = [], isLoading } = useUserAddresses();
  useEffect(() => {
    if (addresses.length > 0 && !selectAddress) {
      const defaultAddress = addresses.find((address) => address.isDefault);
      if (defaultAddress) {
        setSelectAddress(defaultAddress.id);
      }
    }
    if (addresses.length === 0 && !isLoading) {
      setSelectAddress("add_new");
    }
  }, [addresses, selectAddress, isLoading]);

  const setDefaultAddressMutation = useSetDefaultAddress();
  const handleSelectAddress = (addressId: string) => {
    setSelectAddress(addressId);
    setDefaultAddressMutation.mutate(addressId);
  };

  const updateCartShippingAddressMutation = useUpdateCartShippingAddress();
  const continueToCheckout = (addressId: string) => {
    updateCartShippingAddressMutation.mutate({ shippingAddressId: addressId });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold">Identificação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={selectAddress}
            onValueChange={(value) => handleSelectAddress(value)}
            className="space-y-3"
          >
            {isLoading && (
              <p className="text-muted-foreground text-sm">
                Carregando endereços...
              </p>
            )}

            {addresses.map((address) => (
              <Card key={address.id} className="border">
                <CardContent className="flex items-start justify-between gap-3 py-4">
                  <div className="flex items-start gap-3">
                    <RadioGroupItem
                      value={address.id}
                      id={address.id}
                      defaultChecked={address.isDefault === true && true}
                    />
                    <Label htmlFor={address.id} className="cursor-pointer">
                      <div className="space-y-1">
                        <p className="font-semibold">{address.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {address.street}, {address.number} -{" "}
                          {address.neighborhood}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {address.city}/{address.state} - CEP {address.zipCode}
                        </p>
                      </div>
                    </Label>
                  </div>
                  {address.isDefault && (
                    <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
                      Padrão
                    </span>
                  )}
                </CardContent>
              </Card>
            ))}
            <div className="pb-4">
              <Card>
                <CardContent>
                  <div className="m-2 flex items-center space-x-2">
                    <RadioGroupItem value="add_new" id="add_new" />
                    <Label htmlFor="add_new">
                      <span className="font-semibold">
                        Adicionar novo endereço
                      </span>
                    </Label>
                  </div>
                  {selectAddress === "add_new" && <AddAddressForm />}
                </CardContent>
              </Card>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      {!isLoading && (
        <>
          {selectAddress != "add_new" && (
            <div>
              <Button
                className="w-full rounded-full py-5"
                onClick={() => continueToCheckout(selectAddress ?? "")}
              >
                Continuar
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Addresses;
