import crypto from "crypto";

import { db } from ".";
import data from "./pedras.json";
import {
  categoryTable,
  productImageTable,
  productTable,
  productVariantTable,
} from "./schema";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

async function main() {
  console.log("🌱 Iniciando seed...");

  try {
    console.log("🧹 Limpando banco...");

    await db.delete(productImageTable);
    await db.delete(productVariantTable);
    await db.delete(productTable);
    await db.delete(categoryTable);

    console.log("✅ Banco limpo.");

    const uniqueCategories = [
      ...new Set(data.map((product) => product.category)),
    ];

    const categoryMap = new Map<string, string>();

    console.log("📂 Criando categorias...");

    for (const categoryName of uniqueCategories) {
      const categoryId = crypto.randomUUID();

      await db.insert(categoryTable).values({
        id: categoryId,
        name: categoryName,
        slug: generateSlug(categoryName),
      });

      categoryMap.set(categoryName, categoryId);

      console.log(`✅ Categoria criada: ${categoryName}`);
    }

    console.log("📦 Criando produtos...");

    for (const product of data) {
      const productId = crypto.randomUUID();

      const categoryId = categoryMap.get(product.category);

      if (!categoryId) {
        throw new Error(`Categoria não encontrada: ${product.category}`);
      }

      await db.insert(productTable).values({
        id: productId,

        name: product.name,

        slug: generateSlug(product.name),

        description: product.description,

        coverImageUrl: product.coverImageUrl,

        categoryId,
      });

      console.log(`✅ Produto criado: ${product.name}`);

      for (const [index, imageUrl] of product.gallery.entries()) {
        await db.insert(productImageTable).values({
          productId,

          imageUrl,

          displayOrder: index,
        });
      }

      console.log("🖼️ Galeria criada.");

      for (const variant of product.variants) {
        const variantId = crypto.randomUUID();

        await db.insert(productVariantTable).values({
          id: variantId,

          productId,

          name: variant.variant,

          slug: generateSlug(`${product.name}-${variant.variant}`),

          variant: variant.variant,

          priceInCents: variant.priceInCents,

          imageUrl: variant.imageUrl,

          stock: variant.stock,

          isFeatured: false,

          isMadeToOrder: variant.isMadeToOrder,

          isActive: variant.stock > 0,
        });

        console.log(`🎨 Variante criada: ${variant.variant}`);
      }
    }

    console.log("✅ Seed finalizado.");
  } catch (error) {
    console.error("❌ Erro no seed:", error);

    throw error;
  }
}

main().catch(console.error);
