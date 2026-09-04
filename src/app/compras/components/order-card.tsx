"use client";

import Image from "next/image";

import { STORAGE_URL } from "@/db/cloudflare";

interface OrderCardProps {
  id: string;
  date: Date;
  status: "pending" | "shipped" | "delivered" | "canceled" | "returned";
  name: string;
  quantity: number;
  image: string;
  subtotal: number;
  total: number;
}

const OrderCard = ({
  id,
  date,
  status,
  name,
  quantity,
  image,
  subtotal,
  total,
}: OrderCardProps) => {
  const statusConfig = {
    pending: {
      label: "Pagamento pendente",
      className: "text-yellow-600",
    },
    shipped: {
      label: "Pedido enviado",
      className: "text-blue-600",
    },
    delivered: {
      label: "Pedido entregue",
      className: "text-green-600",
    },
    canceled: {
      label: "Pedido cancelado",
      className: "text-red-600",
    },
    returned: {
      label: "Pedido devolvido",
      className: "text-orange-600",
    },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(id);
  };

  return (
    <div>
      <p>
        <span className="text-muted-foreground">
          Id do pedido: {id.slice(0, 16)}...{" "}
        </span>
        <span
          onClick={handleCopy}
          className="text-blue-600 hover:cursor-pointer hover:text-red-500"
        >
          Copiar
        </span>
      </p>
      <p>Data: {date.toLocaleDateString("pt-BR")}</p>
      <p className={statusConfig[status].className}>
        {statusConfig[status].label}
      </p>
      <p>{name}</p>
      <p>x{quantity}</p>
      <Image
        src={STORAGE_URL + image}
        alt="Imagem do pedido"
        width={100}
        height={100}
      />
      <p>{subtotal}</p>
      <p>{total}</p>
      <p>Mais</p>
    </div>
  );
};

export default OrderCard;
