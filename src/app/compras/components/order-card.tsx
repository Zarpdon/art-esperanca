"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { formatCentsToUnits } from "@/components/common/helpers/money";
import { Button } from "@/components/ui/button";
import { STORAGE_URL } from "@/db/cloudflare";

interface OrderCardProps {
  id: string;
  date: Date;
  status: "pending" | "shipped" | "delivered" | "canceled" | "returned";
  name: string;
  variant: string;
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
  variant,
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

  const router = useRouter();
  const handleOrder = () => {
    router.push(`/pedido/${id}`);
  };

  return (
    <div className="w-full px-3 hover:cursor-pointer" onClick={handleOrder}>
      <div onClick={(e) => e.stopPropagation()}>
        <p className="flex">
          <span className="truncate">
            <span className="">Id do pedido:</span>
            <span className="text-muted-foreground">{id}</span>
          </span>
          <span
            onClick={handleCopy}
            className="ml-1.5 text-blue-600 hover:cursor-pointer hover:text-red-500"
          >
            Copiar
          </span>
        </p>
        <p>Data: {date.toLocaleDateString("pt-BR")}</p>
        <p>
          Status:{" "}
          <span className={statusConfig[status].className}>
            {" "}
            {statusConfig[status].label}
          </span>
        </p>
      </div>

      <div className="flex-col-2 my-2 flex gap-3">
        <div className="shrink-0">
          <Image
            src={STORAGE_URL + image}
            alt="Imagem do pedido"
            width={80}
            height={80}
            className="rounded-lg"
          />
        </div>
        <div>
          <p className="line-clamp-1">{name}</p>
          <p className="line-clamp-1">{variant}</p>
          <p className="mt-3 truncate">
            {formatCentsToUnits(subtotal)}{" "}
            <span className="text-muted-foreground"> x{quantity}</span>
          </p>
        </div>

        <div
          onClick={(e) => e.stopPropagation()}
          className="mx-0.5 ml-auto flex flex-col items-center gap-1.5"
        >
          <Button className="w-full rounded-full px-3 hover:cursor-pointer">
            Escreva um comentário
          </Button>
          <Button
            className="w-full rounded-full hover:cursor-pointer"
            variant="outline"
          >
            Comprar Novamente
          </Button>
          <Button
            className="w-full rounded-full hover:cursor-pointer"
            variant="outline"
          >
            Mais
          </Button>

          <p className="">Total: {formatCentsToUnits(total)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
