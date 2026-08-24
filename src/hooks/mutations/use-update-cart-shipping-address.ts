import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { updateCartShippingAddress } from "@/actions/update-cart-shipping-address";

export const UPDATE_CART_SHIPPING_ADDRESS_MUTATION_KEY = [
  "update-cart-shipping-address",
] as const;

interface address {
  shippingAddressId: string;
}

export const useUpdateCartShippingAddress = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: UPDATE_CART_SHIPPING_ADDRESS_MUTATION_KEY,
    mutationFn: (data: address) => updateCartShippingAddress(data),
    onSuccess: () => {
      toast.success("Endereço de entrega aplicado com sucesso!");
      router.push("/checkout");
    },
    onError: () => {
      toast.error("Erro ao aplicar endereço de entrega");
      router.push("/identificacao");
    },
  });
};
