import { getProducts } from "@/app/_data-access/product/get-products";
import SheetSale from "./sheet-sale";
import { ComboboxOption } from "@/app/_components/ui/Combobox";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { Button } from "@/app/_components/ui/button";


const CreateSaleButton = async() => {
  const products = await getProducts();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  return (
    <SheetSale 
    products={products}        
    productOptions={productOptions}
    />
  )
}

export const CreateSaleButtonSkeleton = () => {
  return (
     <Skeleton>
        <Button className="bg-gray-200">
          <span className="w-4 h-4 bg-gray-300"></span>
          <span className="w-20 h-4 bg-gray-300"></span>
        </Button>
      </Skeleton>
  )
}

export default CreateSaleButton
