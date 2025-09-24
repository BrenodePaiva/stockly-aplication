import "server-only";
import { db } from "@/app/_lib/prisma";
import { ProductStatusDto } from "../product/get-products";

export interface MostSoldProductDto {
  productId: string;
  name: string;
  totalSold: number;
  status: ProductStatusDto;
  price: number;
}

export const getMostSoldProducts = async (): Promise<MostSoldProductDto[]> => {
  await new Promise((resolver) => setTimeout(resolver, 3000));
  const mostSoldProductsQuery = `
        SELECT "Product"."name", SUM ("SaleProduct"."quantity") as "totalSold", "Product"."price", "Product"."stock", "Product"."id" as "productId"
        FROM "SaleProduct"
        JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
        GROUP BY "Product"."name", "Product"."price", "Product"."stock", "Product"."id"
        ORDER BY "totalSold" DESC
        LIMIT 5
      `;

  const mostSoldProducts = await db.$queryRawUnsafe<
    {
      productId: string;
      name: string;
      totalSold: number;
      stock: number;
      price: number;
    }[]
  >(mostSoldProductsQuery);

  return mostSoldProducts.map((product) => ({
    ...product,
    price: Number(product.price),
    totalSold: Number(product.totalSold),
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  }));
};
