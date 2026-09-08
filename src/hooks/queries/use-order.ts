import { useQuery } from "@tanstack/react-query";

import { getOrder } from "@/actions/get-order";

export const ORDER_QUERY_KEY = ["order"] as const;

export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: [...ORDER_QUERY_KEY, orderId],
    queryFn: async () => getOrder({ orderId }),
  });
};
