"use server";

import { eq } from "drizzle-orm";
import Stripe from "stripe";

import { ImageNull } from "@/components/common/helpers/image_null";
import { getUserSession } from "@/components/common/structure-or-layout/session";
import { db } from "@/db";
import { STORAGE_URL } from "@/db/cloudflare";
import { orderItemTable, orderTable } from "@/db/schema";

import {
  CreateCheckoutSessionSchema,
  createCheckoutSessionSchema,
} from "./schema";

export const createCheckoutSession = async (
  data: CreateCheckoutSessionSchema,
) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found");
  }

  //

  const session = await getUserSession();

  const { orderId } = createCheckoutSessionSchema.parse(data);

  const order = await db.query.orderTable.findFirst({
    where: eq(orderTable.id, orderId),
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  const orderItems = await db.query.orderItemTable.findMany({
    where: eq(orderItemTable.orderId, orderId),
    with: {
      productVariant: {
        with: {
          product: true,
        },
      },
    },
  });

  if (orderItems.length === 0) {
    throw new Error("Order items not found");
  }

  //
  //
  //

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    metadata: {
      orderId,
    },
    line_items: orderItems.map((orderItem) => {
      return {
        price_data: {
          currency: "brl",
          product_data: {
            name: `${orderItem.productName} - ${orderItem.productVariantName}`,
            description: orderItem.productVariant?.product.description || "",
            images: [
              `${STORAGE_URL + orderItem.productVariant?.imageUrl || ImageNull}`,
            ],
          },
          // unit_amount é em centavos
          unit_amount: orderItem.priceInCents,
        },
        quantity: orderItem.quantity,
      };
    }),
  });
  return checkoutSession;
};
