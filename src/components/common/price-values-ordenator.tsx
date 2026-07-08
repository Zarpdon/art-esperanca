import { productTable, productVariantTable } from "@/db/schema";

import { formatCentsToUnits } from "./money";

interface OrderPriceValuesProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
}

const OrderPriceValues = ({ product }: OrderPriceValuesProps) => {
  const priceValues = product.variants.map((variant) => variant.priceInCents);
  const priceValuesOrdered = priceValues.sort((a, b) => a - b);
  if (
    priceValuesOrdered[0] !== priceValuesOrdered[priceValuesOrdered.length - 1]
  ) {
    return (
      <>
        {formatCentsToUnits(priceValuesOrdered[0])} -{" "}
        {formatCentsToUnits(priceValuesOrdered[priceValuesOrdered.length - 1])}
      </>
    );
  }
  return <>{formatCentsToUnits(priceValues[0])}</>;
};

export default OrderPriceValues;
