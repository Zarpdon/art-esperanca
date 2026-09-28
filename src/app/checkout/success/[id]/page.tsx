import PurchaseAcomplished from "@/components/common/identification-or-checkout/purchase-acomplished";

interface SuccessPageProps {
  params: Promise<{ id: string }>;
}

const CheckoutSuccessPage = async ({ params }: SuccessPageProps) => {
  const { id } = await params;
  return (
    <div>
      <PurchaseAcomplished orderId={id} />
    </div>
  );
};

export default CheckoutSuccessPage;
