"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  return (
    <div className="space-y-4 px-5">
      <h3 className="font-medium">Quantidade</h3>
      <div className="flex w-25 items-center justify-between rounded-lg">
        <Button size="icon" variant="ghost" onClick={handleDecrement}>
          <MinusIcon />
        </Button>
        <p>{quantity}</p>
        <Button size="icon" variant="ghost" onClick={handleIncrement}>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

export default QuantitySelector;
