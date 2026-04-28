import "server-only";
import { db } from "@/app/_lib/prisma";
import { Product } from "@/app/generated/prisma";


export type ProductStatusDto = "IN_STOCK" | "OUT_OF_STOCK";

export interface ProductDto extends Omit<Product, "price"> {
  status: ProductStatusDto;
  price: number;
}

export const getProducts = async (): Promise<ProductDto[]> => {
  await new Promise((resolver) => setTimeout(resolver, 2000));

  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    }
  });

  return products.map((product) => ({
    ...product,
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
    price: product.price.toNumber(),
  }));
};
