"use client";
import { Button } from "@/app/_components/ui/button";
import { SalesDto } from "@/app/_data-access/sale/get-sales";
import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

export const saleTableColumns: ColumnDef<SalesDto>[] = [
  {
    accessorKey: "productNames",
    header: "Produto",
  },
  {
    accessorKey: "totalProducts",
    header: "Quantidade de Produtos",
    cell: ({
      row: {
        original: { totalProducts },
      },
    }) => totalProducts,
  },
  {
    accessorKey: "totalAmount",
    header: "Valor Total",
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => formatCurrency(totalAmount),
  },
  {
    accessorKey: "",
    header: "Data",
    cell: ({
      row: {
        original: { date },
      },
    }) => new Date(date).toLocaleDateString("pt-BR"),
  },
  {
    accessorKey: "",
    header: "Ações",
    cell: () => (
      <Button>
        <MoreHorizontalIcon />
      </Button>
    ),
  },
];
