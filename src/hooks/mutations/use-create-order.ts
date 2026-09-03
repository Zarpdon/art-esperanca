import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createOrder } from "@/actions/create-order";
import { CART_QUERY_KEY } from "@/hooks/queries/use-cart";

export const CREATE_ORDER_MUTATION_KEY = ["create-order"] as const;

export const useCreateOrder = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: CREATE_ORDER_MUTATION_KEY,
    mutationFn: () => createOrder(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
    onError: () => {
      toast.error("Erro ao criar pedido");
      router.push("/checkout");
    },
  });
};
