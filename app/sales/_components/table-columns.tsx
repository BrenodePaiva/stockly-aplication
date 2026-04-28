"use client";

import { SalesDto } from "@/app/_data-access/sale/get-sales";
import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import SaleDropdownMenu from "./table-dropdown-menu";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { ComboboxOption } from "@/app/_components/ui/Combobox";

interface SaleTableColumn extends SalesDto {
  products: ProductDto[];
  productOptions: ComboboxOption[];
}

export const saleTableColumns: ColumnDef<SaleTableColumn>[] = [
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
    accessorKey: "date",
    header: "Data",
    cell: ({
      row: {
        original: { date },
      },
    }) => new Date(date).toLocaleDateString("pt-BR"),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: sale } }) => (
      <SaleDropdownMenu
        sale={sale}
        productOptions={sale.productOptions}
        products={sale.products}
      />
    ),
  },
];

export const saleTableColumnsSkeleton = [
  {
    accessorKey: "productNames",
    header: () => <div className="h-3 w-10 bg-gray-200"></div>,
    cell: () => {
      return <div className="w-13 h-3 bg-gray-200" />;
    },
  },
  {
    accessorKey: "totalProducts",
    header: () => <div className="h-3 w-40 bg-gray-200 ml-5"></div>,
    cell: () => {
      return <div className="h-3 w-9 bg-gray-200 ml-5"  />;
    },
  },
  {
    accessorKey: "totalAmount",
    header: () => <div className="h-3 w-10 bg-gray-200"></div>,
    cell: () => {
      return <div className="h-3 w-9 bg-gray-200" />;
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="h-3 w-10 bg-gray-200"></div>,
    cell: () => {
      return <div className="h-3 w-9 bg-gray-200" />;
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="h-3 w-10 bg-gray-200"></div>,
    cell: () => {
      return <div className="h-3 w-9 bg-gray-200" />;
    },
  },
];
