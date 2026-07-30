import { useMutation, useQueryClient } from "@tanstack/react-query";

import { setDefaultAddress } from "@/copilot/actions/set-default-address";

import { USER_ADDRESSES_QUERY_KEY } from "./use-user-addresses";

export const SET_DEFAULT_ADDRESS_MUTATION_KEY = [
  "set-default-address",
] as const;

export const useSetDefaultAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: SET_DEFAULT_ADDRESS_MUTATION_KEY,
    mutationFn: (addressId: string) => setDefaultAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_ADDRESSES_QUERY_KEY });
    },
  });
};
