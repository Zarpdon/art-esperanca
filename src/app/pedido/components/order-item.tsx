"use client";

import Image from "next/image";

import { formatCentsToUnits } from "@/components/common/helpers/money";
import { STORAGE_URL } from "@/db/cloudflare";

interface OrderItemProps {
  name: string;
  variant: string;
  quantity: number;
  image: string;
  subtotal: number;
}

const OrderItem = ({
  name,
  variant,
  quantity,
  image,
  subtotal,
}: OrderItemProps) => {
  return (
    <div className="flex items-center gap-10 md:justify-start">
      <div className="min-h-19.5 min-w-19.5">
        <Image
          src={STORAGE_URL + image}
          alt={name}
          width={78}
          height={78}
          className="rounded-lg"
        />
      </div>
      <div>
        <p>{name}</p>
        <p>{variant}</p>
        <p></p>
        <p>
          {formatCentsToUnits(subtotal)}{" "}
          <span className="text-muted-foreground"> x{quantity}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
