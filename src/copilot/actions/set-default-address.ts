"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export async function setDefaultAddress(addressId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await db.transaction(async (tx) => {
    await tx
      .update(shippingAddressTable)
      .set({ isDefault: false })
      .where(eq(shippingAddressTable.userId, session.user.id));

    await tx
      .update(shippingAddressTable)
      .set({ isDefault: true })
      .where(eq(shippingAddressTable.id, addressId));
  });
}
