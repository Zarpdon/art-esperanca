import { useMutation, useQueryClient } from "@tanstack/react-query";

import { decreaseCartProductOrRemove } from "@/actions/decrease-cart-product-or-remove";

import { CART_QUERY_KEY } from "../queries/use-cart";

export const DECREASE_CART_PRODUCT_OR_REMOVE_MUTATION_KEY = [
  "decrease-cart-product-or-remove",
] as const;

export const useDecreaseCartProductOrRemove = (cartItemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: DECREASE_CART_PRODUCT_OR_REMOVE_MUTATION_KEY,
    mutationFn: () => decreaseCartProductOrRemove({ cartItemId }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY }),
  });
};
