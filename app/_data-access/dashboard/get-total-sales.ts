import "server-only";
import { db } from "@/app/_lib/prisma";

export const getTotalSales = async (): Promise<number> => {
  await new Promise((resolver) => setTimeout(resolver, 3000));
  const totalSales = await db.sale.count();

  return totalSales;
};
