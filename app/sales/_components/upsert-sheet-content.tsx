"use client";
import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/Combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { formateCurrency } from "@/app/_helpers/currency";
import { Product } from "@/app/generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { z } from "zod";
import SaleDropdownMenu from "./table-dropdown-menu";
import { createSale } from "@/app/_actions/create-sale";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { flattenValidationErrors } from "next-safe-action";

const formSchema = z.object({
  productId: z.uuid({ message: "Produto é obrigatório" }),
  quantity: z.coerce.number().int().positive(),
});

type FromShema = z.infer<typeof formSchema>;

interface UpsertSaleSheetContentProps {
  products: Product[];
  productOptions: ComboboxOption[];
  onSubmitSuccess: () => void;
}

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSaleSheetContent = ({
  products,
  productOptions,
  onSubmitSuccess,
}: UpsertSaleSheetContentProps) => {
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct[]>([]);

  const { execute: executeCreateSale } = useAction(createSale, {
    onError: ({ error: { validationErrors, serverError } }) => {
      const flattenedErrors = flattenValidationErrors(validationErrors);

      toast.error(serverError ?? flattenedErrors.formErrors[0]);
    },
    onSuccess: () => {
      toast.success("Venda realizada com sucesso.");
      onSubmitSuccess();
    },
  });

  const form = useForm<FromShema>({
    resolver: zodResolver(formSchema) as unknown as Resolver<FromShema>,
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const onSubmit = (data: FromShema) => {
    const selectedProd = products.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProd) return;

    setSelectedProduct((currentProducts) => {
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProd.id,
      );

      if (existingProduct) {
        const productIsOutOfStock =
          existingProduct.quantity + data.quantity > selectedProd.stock;

        if (productIsOutOfStock) {
          form.setError("quantity", {
            message: "Quantidade indisponível no estoque",
          });
          return currentProducts;
        }
        form.reset();
        return currentProducts.map((product) => {
          if (product.id === selectedProd.id) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            };
          }
          return product;
        });
      }

      const productIsOutOfStock = data.quantity > selectedProd.stock;
      if (productIsOutOfStock) {
        form.setError("quantity", {
          message: "Quantidade indisponível no estoque",
        });
        return currentProducts;
      }
      form.reset();
      return [
        ...currentProducts,
        {
          ...selectedProd,
          price: Number(selectedProd.price),
          quantity: data.quantity,
        },
      ];
    });
  };

  const productsTotal = useMemo(() => {
    return selectedProduct.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [selectedProduct]);

  const onDelete = (productId: string) => {
    setSelectedProduct((currentProducts) => {
      return currentProducts.filter((product) => product.id !== productId);
    });
  };

  const onSubmitSale = async () => {
    executeCreateSale({
      products: selectedProduct.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    });
  };

  return (
    <SheetContent className="!max-w-[700px]">
      <SheetHeader>
        <SheetTitle>Nova Venda</SheetTitle>
        <SheetDescription>
          Insirar as informações da venda abaixo
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    placeholder="Selecione um produto"
                    options={productOptions}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Digite a quantidade"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" variant="secondary">
            <PlusIcon />
            Adicionar produto à venda
          </Button>
        </form>
      </Form>

      <Table>
        <TableCaption>Lista dos produtos adicionados à venda.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço Unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProduct.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formateCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {formateCurrency(product.price * product.quantity)}
              </TableCell>
              <TableCell>
                <SaleDropdownMenu product={product} onDelete={onDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{formateCurrency(productsTotal)}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <SheetFooter className="pt-6">
        <Button
          className="w-full"
          disabled={selectedProduct.length === 0}
          onClick={onSubmitSale}
        >
          <CheckIcon />
          Finalizar venda
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSaleSheetContent;
