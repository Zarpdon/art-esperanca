"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export interface UserAddress {
  id: string;
  userId: string;
  name: string;
  street: string;
  number: string;
  neighborhood: string;
  complement: string | null;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
  createdAt: Date;
}

export async function getUserAddresses(): Promise<UserAddress[]> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const addresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
    orderBy: (address, { desc }) => [
      desc(address.isDefault),
      desc(address.createdAt),
    ],
  });

  return addresses.map((address) => ({
    ...address,
    complement: address.complement ?? null,
  }));
}
