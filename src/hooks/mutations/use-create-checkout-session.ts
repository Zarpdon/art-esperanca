import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createCheckoutSession } from "@/actions/create-checkout-session";

interface CreateCheckoutSessionProps {
  orderId: string;
}

export const CREATE_CHECKOUT_SESSION_MUTATION_KEY = [
  "create-checkout-session",
] as const;

export const useCreateCheckoutSession = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: CREATE_CHECKOUT_SESSION_MUTATION_KEY,
    mutationFn: ({ orderId }: CreateCheckoutSessionProps) =>
      createCheckoutSession({ orderId }),
    onError: () => {
      toast.error("Ops, algo deu errado");
      router.push("/checkout");
    },
  });
};
