"use client";

import { ColumnDef } from "@tanstack/react-table";

import ProductDropdownMenu from "./table-dropdown-menu";
import { ProductDto } from "@/app/_data-access/product/get-products";
import ProductStatusBadge from "@/app/_components/product-status-badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const productTableColumns: ColumnDef<ProductDto>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
    cell: (row) => {
      const product = row.row.original;
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(product.price));
    },
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row: { original: product } }) => {
      return <ProductStatusBadge status={product.status} />;
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => {
      const product = row.row.original;
      return <ProductDropdownMenu product={product} />;
    },
  },
];

export const productTableColumnsSkeleton = [
  {
    accessorKey: "name",
    header: () => <div className="h-3 w-10 bg-gray-200"></div>,
    cell: () => {
      return <div className="h-3 w-9 bg-gray-200" />;
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="h-3 w-14 bg-gray-200"></div>,
    cell: () => {
      return <div className="w-13 h-3 bg-gray-200" />;
    },
  },
  {
    accessorKey: "stock",
    header: () => <div className="h-3 w-10 bg-gray-200"></div>,
    cell: () => {
      return <div className="h-3 w-9 bg-gray-200" />;
    },
  },
  {
    accessorKey: "status",
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
