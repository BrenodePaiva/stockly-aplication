import { deleteSale } from "@/app/_actions/sale/delete-sale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import UpsertSaleSheetContent from "./upsert-sheet-content";
import { useState } from "react";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { ComboboxOption } from "@/app/_components/ui/Combobox";
import { SalesDto } from "@/app/_data-access/sale/get-sales";

interface SaleDropdownMenuProps {
  sale: Pick<SalesDto, "id" | "saleProducts">;
  productOptions: ComboboxOption[];
  products: ProductDto[];
}

const SaleDropdownMenu = ({
  sale,
  productOptions,
  products,
}: SaleDropdownMenuProps) => {
  const [upsertSheetIsOpen, setUpsertSheetIsOpen] = useState(false);
  const { execute: executeDeleteSale } = useAction(deleteSale, {
    onError: () => {
      toast.error("Erro ao deletar a venda.");
    },
    onSuccess: () => {
      toast.success("Venda deletada com sucesso.");
    },
  });

  const handleCopyToClipboardClick = () => {
    navigator.clipboard.writeText(sale.id);
    toast.success("ID copiado para área de transferencia");
  };

  const handleConfirmeDeleteClick = () => {
    executeDeleteSale({ id: sale.id });
  };
  return (
    <Sheet open={upsertSheetIsOpen} onOpenChange={setUpsertSheetIsOpen}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleCopyToClipboardClick}>
              <ClipboardCopyIcon /> Copiar ID
            </DropdownMenuItem>

            <SheetTrigger asChild>
              <DropdownMenuItem>
                <EditIcon /> Editar
              </DropdownMenuItem>
            </SheetTrigger>

            <AlertDialogTrigger asChild>
              <DropdownMenuItem>
                <TrashIcon /> Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a excluir esta venda. Esta ação não pode ser
              desfeita. Deseja continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmeDeleteClick}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <UpsertSaleSheetContent
        isOpen={upsertSheetIsOpen}
        saleId={sale.id}
        productOptions={productOptions}
        products={products}
        onSubmitSuccess={() => setUpsertSheetIsOpen(false)}
        defaultSelectedProducts={sale.saleProducts.map((saleProduct) => ({
          id: saleProduct.productId,
          quantity: saleProduct.quantity,
          name: saleProduct.productName,
          price: saleProduct.unitPrice,
        }))}
      />
    </Sheet>
  );
};

export default SaleDropdownMenu;
