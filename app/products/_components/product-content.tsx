import { DataTable } from "../../_components/ui/data-table";
import {
  productTableColumns,
  productTableColumnsSkeleton,
} from "../_components/table-columns";
import { getProducts } from "../../_data-access/product/get-products";
import { Skeleton } from "@/app/_components/ui/skeleton";

const ProductContent = async () => {
  const products = await getProducts();

  return (
      <DataTable columns={productTableColumns} data={products} />
  );
};

export default ProductContent;

export const ProductContentSkeleton = () => {
  const productsSkeleton = Array.from({ length: 20}, () => ({
     name: "",
      price: "",
      stock: "",
      status: "",
      actions: "",
  }))
  // const productsSkeleton = [
  //   {
  //     name: "",
  //     price: "",
  //     stock: "",
  //     status: "",
  //     actions: "",
  //   },
  //   {
  //     name: "",
  //     price: "",
  //     stock: "",
  //     status: "",
  //     actions: "",
  //   },
  //   {
  //     name: "",
  //     price: "",
  //     stock: "",
  //     status: "",
  //     actions: "",
  //   },
  //   {
  //     name: "",
  //     price: "",
  //     stock: "",
  //     status: "",
  //     actions: "",
  //   },
  //   {
  //     name: "",
  //     price: "",
  //     stock: "",
  //     status: "",
  //     actions: "",
  //   },
  // ];
  return (
      <Skeleton className="space-y-8 bg-white">

        <DataTable
          columns={productTableColumnsSkeleton}
          data={productsSkeleton}
        />
      </Skeleton>
  );
};
