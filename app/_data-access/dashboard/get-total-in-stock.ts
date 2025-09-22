import "server-only";
import { db } from "@/app/_lib/prisma";

export const getTotalInStock = async (): Promise<number> => {
  await new Promise((resolver) => setTimeout(resolver, 2000));
  const totalStock = await db.product.aggregate({
    _sum: {
      stock: true,
    },
  });

  return Number(totalStock._sum.stock);
};
