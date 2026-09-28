"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface OrderAddressProps {
  id: string;
  name: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

const OrderAddress = ({
  id,
  name,
  street,
  number,
  neighborhood,
  city,
  state,
  zipCode,
}: OrderAddressProps) => {
  const orderId = id;
  const address = {
    name,
    street,
    number,
    neighborhood,
    city,
    state,
    zipCode,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(id);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex gap-1.5">
              <span className="line-clamp-1">Pedido: {id}</span>
              <span
                onClick={handleCopy}
                className="text-blue-700 hover:cursor-pointer hover:text-red-500"
              >
                Copiar
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Informações da entrega</p>

          <Card>
            <CardContent className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <Label htmlFor={orderId}>
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
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </>
  );
};

export default OrderAddress;
