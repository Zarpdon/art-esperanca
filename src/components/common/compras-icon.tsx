"use client";

import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ComprasIconProps {
  onClick?: () => void;
}

const useComprasClick = () => {
  const router = useRouter();

  const HandleComprasClick = () => {
    router.push("/compras");
  };
  return HandleComprasClick;
};

const ComprasIcon = ({ onClick }: ComprasIconProps) => {
  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" onClick={onClick}>
        <ShoppingBag className="h-5 w-5" />
        <span>Compras</span>
      </Button>
    </div>
  );
};

export { ComprasIcon, useComprasClick };
