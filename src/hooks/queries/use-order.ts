import { useQuery } from "@tanstack/react-query";

import { getOrder } from "@/actions/get-order";

export const ORDER_QUERY_KEY = ["order"] as const;

export const useOrder = (page?: boolean, specificId?: string) => {
  return useQuery({
    queryKey: [...ORDER_QUERY_KEY, page, specificId],
    queryFn: async () => getOrder({ page, specificId }),
  });
};
