"use client";

import { MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

const QuantitySelector = ({
  quantity,
  onQuantityChange,
}: QuantitySelectorProps) => {
  const handleDecrement = () => {
    onQuantityChange(quantity > 1 ? quantity - 1 : 1);
  };

  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
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
