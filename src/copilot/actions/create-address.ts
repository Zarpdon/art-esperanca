"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export interface CreateAddressInput {
  email: string;
  fullName: string;
  cpf: string;
  mobile: string;
  cep: string;
  address: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export async function createAddress(data: CreateAddressInput) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await db.insert(shippingAddressTable).values({
    userId: session.user.id,
    name: data.fullName,
    street: data.address,
    number: data.number,
    neighborhood: data.neighborhood,
    complement: data.complement ?? null,
    city: data.city,
    state: data.state,
    zipCode: data.cep,
    country: "BR",
    phone: data.mobile,
  });
}
