"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { cartTable, orderItemTable, orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export const createOrder = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }

  const user = await db.query.userTable.findFirst({
    where: (user, { eq }) => eq(user.id, session.user.id),
  });

  if (!user) {
    throw new Error("Unauthorized");
  }

  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });
  if (!cart) {
    throw new Error("Cart not found");
  }

  const shippingAddress = cart.shippingAddress;
  if (!shippingAddress) {
    throw new Error("Shipping address not found");
  }

  const subTotalPriceInCents = cart.items.reduce(
    (total, item) => total + item.productVariant.priceInCents * item.quantity,
    0,
  );

  const totalPriceInCents = subTotalPriceInCents + 0;

  return await db.transaction(async (tx) => {
    const [order] = await tx
      .insert(orderTable)
      .values({
        userId: session.user.id,
        shippingEmail: user.email,
        shippingName: shippingAddress.name,
        shippingDocument: shippingAddress.document,
        shippingPhone: shippingAddress.phone,
        shippingZipCode: shippingAddress.zipCode,
        shippingStreet: shippingAddress.street,
        shippingNumber: shippingAddress.number,
        shippingComplement: shippingAddress.complement,
        shippingNeighborhood: shippingAddress.neighborhood,
        shippingCity: shippingAddress.city,
        shippingState: shippingAddress.state,
        shippingCountry: shippingAddress.country,
        priceShippingInCents: 0,
        priceTotalInCents: totalPriceInCents,
      })
      .returning();

    if (!order) {
      throw new Error("Failed to create order");
    }

    await tx.insert(orderItemTable).values(
      cart.items.map((item) => ({
        orderId: order.id,
        productVariantId: item.productVariant.id,
        productName: item.productVariant.product.name,
        productVariantName: item.productVariant.name,
        priceInCents: item.productVariant.priceInCents,
        quantity: item.quantity,
      })),
    );
    await tx.delete(cartTable).where(eq(cartTable.id, cart.id));

    return order.id;
  });
};
