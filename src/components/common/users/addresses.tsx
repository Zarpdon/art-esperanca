"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AddAddressForm from "@/copilot/components/forms/add-address-form";

const Addresses = () => {
  const [selectAddress, setSelectAddress] = useState<string | null>("");

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold">Identificação</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectAddress}
            onValueChange={setSelectAddress}
            className="mb-2"
          >
            <Card>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="add_new" id="add_new"></RadioGroupItem>
                  <Label htmlFor="add_new">
                    <span className="font-semibold">
                      Adicionar novo endereço
                    </span>
                  </Label>
                </div>
              </CardContent>
            </Card>
          </RadioGroup>
          {selectAddress === "add_new" && <AddAddressForm />}
        </CardContent>
      </Card>
    </div>
  );
};

export default Addresses;
