import { useMutation } from "@tanstack/react-query";

import { createAddress } from "@/copilot/actions/create-address";

export const CREATE_ADDRESS_MUTATION_KEY = ["create-address"] as const;

export const useCreateAddress = () => {
  return useMutation({
    mutationKey: CREATE_ADDRESS_MUTATION_KEY,
    mutationFn: (values: Parameters<typeof createAddress>[0]) =>
      createAddress(values),
  });
};
