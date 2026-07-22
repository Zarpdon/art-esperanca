import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addProductToCart } from "@/actions/add-cart-product";

import { CART_QUERY_KEY } from "../queries/use-cart";

export const INCREASE_CART_PRODUCT_OR_ADD_MUTATION_KEY = [
  "increase-cart-product-or-add",
] as const;

export const useIncreaseCartProductOrAdd = (productVariantId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: INCREASE_CART_PRODUCT_OR_ADD_MUTATION_KEY,
    mutationFn: () => addProductToCart({ productVariantId, quantity: 1 }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY }),
  });
};
