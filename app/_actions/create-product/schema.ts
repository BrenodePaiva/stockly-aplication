import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().min(1, { message: "O campo nome é obrigatório." }),
  price: z.number().min(0.01, { message: "O campo preço é obrigatório." }),
  stock: z.coerce
    .number()
    .int()
    .positive({ message: "A quantidade deve ser maior que zero" }),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
