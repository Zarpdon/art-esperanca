import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createAddress } from "@/copilot/actions/create-address";

import { USER_ADDRESSES_QUERY_KEY } from "./use-user-addresses";

export const CREATE_ADDRESS_MUTATION_KEY = ["create-address"] as const;

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: CREATE_ADDRESS_MUTATION_KEY,
    mutationFn: (values: Parameters<typeof createAddress>[0]) =>
      createAddress(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_ADDRESSES_QUERY_KEY });
    },
  });
};
