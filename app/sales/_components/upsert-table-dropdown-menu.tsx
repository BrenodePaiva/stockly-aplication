import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Product } from "@/app/generated/prisma";
import { ClipboardCopyIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";

interface UpsertSaleDropdownMenuProps {
  product: Pick<Product, "id">;
  onDelete: (productId: string) => void;
}

const UpsertSaleDropdownMenu = ({
  product,
  onDelete,
}: UpsertSaleDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontalIcon size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(product.id)}
        >
          <ClipboardCopyIcon /> Copiar ID
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onDelete(product.id)}>
          <TrashIcon /> Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UpsertSaleDropdownMenu;
