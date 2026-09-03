interface OrderPageProps {
  params: Promise<{ id: string }>;
}

const OrderPage = async ({ params }: OrderPageProps) => {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <h1 className="text-4xl font-bold">Pedido: {id}</h1>
    </div>
  );
};

export default OrderPage;
