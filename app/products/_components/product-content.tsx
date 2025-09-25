import { DataTable } from "../../_components/ui/data-table";
import {
  productTableColumns,
  productTableColumnsSkeleton,
} from "../_components/table-columns";
import { getProducts } from "../../_data-access/product/get-products";
import CreateProductButton from "../_components/create-product-button";
import {
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from "../../_components/header";
import { Skeleton } from "@/app/_components/ui/skeleton";

const ProductContent = async () => {
  const products = await getProducts();

  return (
    <div className="m-8 ml-56 w-full space-y-8 rounded-lg bg-white p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Gestão de Produtos</HeaderSubtitle>
          <HeaderTitle>Produto</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <CreateProductButton />
        </HeaderRight>
      </Header>

      <DataTable columns={productTableColumns} data={products} />
    </div>
  );
};

export default ProductContent;

export const ProductContentSkeleton = () => {
  const productsSkeleton = [
    {
      name: "",
      price: "",
      stock: "",
      status: "",
      actions: "",
    },
    {
      name: "",
      price: "",
      stock: "",
      status: "",
      actions: "",
    },
    {
      name: "",
      price: "",
      stock: "",
      status: "",
      actions: "",
    },
    {
      name: "",
      price: "",
      stock: "",
      status: "",
      actions: "",
    },
    {
      name: "",
      price: "",
      stock: "",
      status: "",
      actions: "",
    },
  ];
  return (
    <div className="m-8 ml-56 w-full space-y-8 rounded-lg bg-white p-8">
      <Skeleton className="space-y-8 bg-white">
        <Header>
          <HeaderLeft>
            <div className="mb-4 h-3 w-28 bg-gray-200"></div>
            <div className="h-6 w-20 bg-gray-200"></div>
          </HeaderLeft>
          <HeaderRight>
            <div className="h-10 w-32 rounded-md bg-gray-200"></div>
          </HeaderRight>
        </Header>

        <DataTable
          columns={productTableColumnsSkeleton}
          data={productsSkeleton}
        />
      </Skeleton>
    </div>
  );
};
