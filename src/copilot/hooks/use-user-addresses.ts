import { useQuery } from "@tanstack/react-query";

import { getUserAddresses } from "@/copilot/actions/get-user-addresses";

export const USER_ADDRESSES_QUERY_KEY = ["user-addresses"] as const;

export const useUserAddresses = () => {
  return useQuery({
    queryKey: USER_ADDRESSES_QUERY_KEY,
    queryFn: () => getUserAddresses(),
  });
};
