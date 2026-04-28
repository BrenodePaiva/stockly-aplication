import { ComboboxOption } from "@/app/_components/ui/Combobox";
import { getProducts } from "@/app/_data-access/product/get-products";
import { getSales } from "@/app/_data-access/sale/get-sales";
import { DataTable } from "@/app/_components/ui/data-table";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { saleTableColumns, saleTableColumnsSkeleton } from "./table-columns";

const SaleContent = async () => {
const sales = await getSales();
  const products = await getProducts();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  const tableData = sales.map((sale) => ({
    ...sale,
    products,
    productOptions,
  }));

  return (
  <DataTable columns={saleTableColumns} data={tableData} />
  )
}

export const SaleContentSkeleton = () => {
  const salesSkeleton = Array.from( { length: 20}, () => ({
        productNames: "",
        totalProducts: "",
        totalAmount: "",
        date: "",
        actions: ""
        
    }))

  return (
      <Skeleton className="space-y-8 bg-white">

        <DataTable
          columns={saleTableColumnsSkeleton}
          data={salesSkeleton}
        />
      </Skeleton>
  );
};

export default SaleContent